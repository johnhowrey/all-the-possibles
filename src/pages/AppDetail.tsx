import { useParams, Link } from "react-router-dom";
import { apps } from "../data/apps";

export default function AppDetail() {
  const { id } = useParams<{ id: string }>();
  const app = apps.find((a) => a.id === id);

  if (!app) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-extrabold text-4xl uppercase font-futura text-atp-dark">
            App not found
          </h1>
          <Link to="/" className="text-atp-red mt-4 inline-block font-futura">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* App Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8">
          <img
            src={app.icon}
            alt={app.name}
            className="w-32 h-32 rounded-3xl shadow-lg"
          />
          <div className="text-center md:text-left">
            <h1 className="font-extrabold text-4xl uppercase tracking-wide font-futura text-atp-dark m-0">
              {app.name}
            </h1>
            <p
              className="text-lg font-bold font-futura mt-1"
              style={{ color: app.accentColor }}
            >
              {app.subtitle}
            </p>
            <p className="text-gray-600 mt-3 font-futura text-lg max-w-xl leading-relaxed">
              {app.description}
            </p>
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-atp-dark text-white px-6 py-3 rounded-full font-bold font-futura uppercase tracking-wider text-sm hover:bg-black transition-colors no-underline"
              >
                Download on the App Store
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      {app.screenshots.length > 0 && (
        <section className="bg-atp-dark py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-extrabold text-2xl uppercase tracking-wider text-white mb-8 font-futura text-center">
              Screenshots
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 justify-center">
              {app.screenshots.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${app.name} screenshot ${i + 1}`}
                  className="h-[500px] rounded-2xl shadow-lg flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-extrabold text-2xl uppercase tracking-wider text-atp-dark mb-8 font-futura">
          Features
        </h2>
        <ul className="space-y-4">
          {app.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-gray-700 font-futura text-lg"
            >
              <span
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: app.accentColor }}
              />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Privacy */}
      <section id="privacy" className="bg-white border-t border-gray-200 scroll-mt-6">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="font-extrabold text-2xl uppercase tracking-wider text-atp-dark mb-2 font-futura">
            Privacy Policy
          </h2>
          <p className="text-sm text-gray-400 font-futura mb-6">
            Effective: {app.privacy.effectiveDate} · Draft — pending legal review
          </p>
          <p className="text-gray-700 font-futura text-lg mb-8 leading-relaxed">
            {app.privacy.summary}
          </p>
          <div className="space-y-6">
            {app.privacy.sections.map((section, i) => (
              <div key={i}>
                <h3 className="font-bold text-lg text-atp-dark font-futura mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 font-futura leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 font-futura mt-8 text-sm">
            Questions? Visit{" "}
            <span className="text-atp-red">{app.privacy.contact}</span>
          </p>
        </div>
      </section>

      {/* Terms */}
      {app.terms && (
        <section id="terms" className="bg-white border-t border-gray-200 scroll-mt-6">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <h2 className="font-extrabold text-2xl uppercase tracking-wider text-atp-dark mb-2 font-futura">
              Terms of Use
            </h2>
            <p className="text-sm text-gray-400 font-futura mb-6">
              Effective: {app.terms.effectiveDate} · Draft — pending legal review
            </p>
            <p className="text-gray-700 font-futura text-lg mb-8 leading-relaxed">
              {app.terms.summary}
            </p>
            <div className="space-y-6">
              {app.terms.sections.map((section, i) => (
                <div key={i}>
                  <h3 className="font-bold text-lg text-atp-dark font-futura mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 font-futura leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Refund policy */}
      {app.refundPolicy && (
        <section id="refunds" className="bg-white border-t border-gray-200 scroll-mt-6">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <h2 className="font-extrabold text-2xl uppercase tracking-wider text-atp-dark mb-2 font-futura">
              Refund Policy
            </h2>
            <p className="text-sm text-gray-400 font-futura mb-6">
              Effective: {app.refundPolicy.effectiveDate} · Draft — pending legal review
            </p>
            <p className="text-gray-700 font-futura text-lg mb-8 leading-relaxed">
              {app.refundPolicy.summary}
            </p>
            <div className="space-y-6">
              {app.refundPolicy.sections.map((section, i) => (
                <div key={i}>
                  <h3 className="font-bold text-lg text-atp-dark font-futura mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 font-futura leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="text-atp-red font-bold font-futura uppercase tracking-wider text-sm hover:underline no-underline"
        >
          &larr; All Apps
        </Link>
      </div>
    </main>
  );
}
