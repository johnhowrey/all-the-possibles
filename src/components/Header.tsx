import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-atp-red">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src="/icon.svg" alt="All the Possibles" className="h-10 w-10 rounded-lg" />
          <span className="text-white font-extrabold text-xl tracking-wide uppercase font-futura">
            All the Possibles
          </span>
        </Link>
      </div>
    </header>
  );
}
