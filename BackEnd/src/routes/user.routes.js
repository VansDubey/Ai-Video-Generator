import { Router } from "express";
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { signAccessToken, signRefreshToken, hashToken } from '../lib/auth.js';
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get('/',async(req,res)=>{
  res.send("Api is running");
})

router.post('/register', async (req,res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password) return res.status(400).json({ error: 'Missing' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email exists' });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, name });

  // issue tokens
  const jti = uuidv4();
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user, jti);
  user.refreshTokens.push({
    jti,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + /* parse REFRESH_TOKEN_EXP */ 30*24*3600*1000)
  });
  await user.save();

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV==='production', sameSite: 'Strict', maxAge: 30*24*60*60*1000, path: '/auth/refresh' });
  return res.status(201).json({ accessToken, user: { id: user._id, email: user.email, name: user.name, roles: user.roles } });
});

router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const jti = uuidv4();
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user, jti);

  user.refreshTokens.push({ jti, tokenHash: hashToken(refreshToken), deviceInfo: req.get('User-Agent'), expiresAt: new Date(Date.now()+30*24*3600*1000) });
  await user.save();

  res.cookie('refreshToken', refreshToken, { httpOnly:true, secure:process.env.NODE_ENV==='production', sameSite:'Strict', maxAge:30*24*3600*1000, path: '/auth/refresh' });
  res.json({ accessToken, user: { id:user._id, email:user.email, name:user.name, roles:user.roles } });
});

router.post('/refresh', async (req,res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'No refresh token' });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const userId = payload.sub;
    const jti = payload.jti;

    const user = await User.findById(userId);
    if (!user) throw new Error('No user');

    // find matching hashed refresh token
    const tokenHash = hashToken(token);
    const stored = user.refreshTokens.find(rt => rt.jti === jti && rt.tokenHash === tokenHash);
    if (!stored) {
      // possible reuse -> revoke all refresh tokens (security response) OR require re-login
      user.refreshTokens = [];
      await user.save();
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // rotation: remove old refresh token and create a new one
    user.refreshTokens = user.refreshTokens.filter(rt => rt.jti !== jti);

    const newJti = uuidv4();
    const newRefreshToken = signRefreshToken(user, newJti);
    user.refreshTokens.push({ jti: newJti, tokenHash: hashToken(newRefreshToken), deviceInfo: req.get('User-Agent'), expiresAt: new Date(Date.now()+30*24*3600*1000) });

    await user.save();

    const newAccessToken = signAccessToken(user);
    res.cookie('refreshToken', newRefreshToken, { httpOnly:true, secure: process.env.NODE_ENV==='production', sameSite:'Strict', maxAge:30*24*3600*1000, path: '/auth/refresh' });
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/logout', async (req,res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(payload.sub);
      if (user) {
        user.refreshTokens = user.refreshTokens.filter(rt => rt.jti !== payload.jti);
        await user.save();
      }
    } catch(e) { /* ignore */ }
  }
  res.clearCookie('refreshToken', { path: '/auth/refresh' });
  res.json({ ok: true });
});


export default router
