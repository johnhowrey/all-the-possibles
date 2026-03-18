export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="flex">
        <div className="h-3 flex-1 bg-atp-pink" />
        <div className="h-3 flex-1 bg-atp-red" />
        <div className="h-3 flex-1 bg-atp-yellow" />
      </div>
      <div className="bg-atp-dark text-white px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/icon.svg" alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-extrabold text-sm tracking-widest uppercase font-futura">
              All the Possibles
            </span>
          </div>
          <p className="text-sm text-gray-400 font-futura">
            An App Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
