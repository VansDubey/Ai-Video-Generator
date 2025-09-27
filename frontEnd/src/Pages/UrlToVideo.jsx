import React, { useState } from "react";

const UrlToVideo = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      alert("Please enter a valid URL");
      return;
    }
    console.log("Converting URL to video:", url);
    // ✅ Add your API call or navigation logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Enter the URL and see the magic of AI ✨
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-2 border-gray-300 rounded-xl p-2 w-full max-w-lg bg-white shadow-md"
      >
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition active:scale-95"
        >
          Convert to Video
        </button>
      </form>
    </div>
  );
};

export default UrlToVideo;
