import { apps } from "../data/apps";
import AppTile from "../components/AppTile";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-atp-red text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <img
            src="/logo.svg"
            alt="All the Possibles — An App Studio"
            className="mx-auto max-w-md w-full"
          />
        </div>
      </section>

      {/* Apps Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-extrabold text-3xl uppercase tracking-wider text-center mb-12 font-futura text-atp-dark">
          Our Apps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {apps.map((app) => (
            <AppTile key={app.id} app={app} />
          ))}
        </div>
      </section>
    </main>
  );
}
