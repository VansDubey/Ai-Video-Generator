# Ai-Video-Generator

1. Blocking cross origin access , even if cors_origin = *, because when credentials = true(allowing oauth,cookies etc), then the browser restricts using cross_origin = *

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

Use this instead.