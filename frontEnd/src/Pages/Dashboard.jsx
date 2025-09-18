// src/pages/Dashboard.tsx
import { Home, FileVideo, Layers, Library, Settings } from "lucide-react";

export default function Dashboard() {
  const sidebarItems = [
    { icon: Home, label: "Home", active: true },
    { icon: FileVideo, label: "Projects" },
    { icon: Layers, label: "Templates" },
    { icon: Library, label: "Library" },
    { icon: Settings, label: "Settings" },
  ];

  const featuredTemplates = ["Epend Abode", "Crsen Polde", "Light Show"];
  const recentProjects = [
    { title: "Souch Video", date: "Last edited 2 days ago" },
    { title: "Alove Cheviator", date: "Last edited 5 days ago" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <h1 className="font-bold text-xl">AI Video</h1>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-3">
            {sidebarItems.map(({ icon: Icon, label, active }) => (
              <li
                key={label}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                  active ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" /> {label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Quick Start */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Quick Start</h2>
          <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Quick start template preview"
              className="rounded-md"
            />
            <div>
              <h3 className="font-semibold text-white">Souch Video</h3>
              <p className="text-sm text-gray-400">
                A quick intro project template
              </p>
            </div>
          </div>
        </section>

        {/* Featured Templates */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Featured Templates</h2>
          <div className="flex gap-4">
            {featuredTemplates.map((title, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-lg overflow-hidden w-40 cursor-pointer hover:ring-2 hover:ring-indigo-500 transition"
              >
                <img
                  src="https://via.placeholder.com/160x90"
                  alt={`${title} template`}
                  className="w-full h-24 object-cover"
                />
                <p className="p-2 text-sm">{title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Projects */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {recentProjects.map((project, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Create New Video */}
        <div className="mt-10 flex justify-center">
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition">
            Create New Video
          </button>
        </div>
      </main>
    </div>
  );
}
