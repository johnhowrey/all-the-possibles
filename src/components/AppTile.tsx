import { Link } from "react-router-dom";
import type { AppInfo } from "../data/apps";

interface AppTileProps {
  app: AppInfo;
}

export default function AppTile({ app }: AppTileProps) {
  return (
    <Link
      to={`/app/${app.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow no-underline"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={app.icon}
          alt={app.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h2 className="font-extrabold text-xl text-atp-dark uppercase tracking-wide font-futura m-0">
          {app.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1 font-futura" style={{ color: app.accentColor }}>
          {app.subtitle}
        </p>
        <p className="text-sm text-gray-600 mt-2 font-futura leading-relaxed">
          {app.tagline}
        </p>
      </div>
    </Link>
  );
}
