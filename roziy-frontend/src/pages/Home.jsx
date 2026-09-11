import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSiteSettings, getTestimonials } from "../api/endpoints";
import "./home.css";

// Turns a normal YouTube watch/share URL into an embeddable player URL.
// Returns null for anything else (e.g. Instagram links), so those still
// just show as an outbound link instead of a broken embed.
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function Home() {
  const [settings, setSettings] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
    getTestimonials().then(setTestimonials).catch(() => {});
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">
              {settings?.grades_offered ?? "1-9-sinflar"} &middot; since {settings?.since_year ?? 2026}
            </span>
            <h1>Barcha bolalar uchun &mdash; Roziy maktabi eshiklari ochiq</h1>
            <p>
              {settings?.tagline ??
                "Bilim va tarbiya - bizning yo'limiz, rozi ota-ona va baxtli o'quvchi - natijamiz!"}
            </p>
            <div className="hero__actions">
              <Link to="/qabul" className="btn btn--primary">Hoziroq murojaat qiling</Link>
              <a href={`tel:${settings?.phone ?? "+998977510065"}`} className="btn btn--outline">
                {settings?.phone ?? "+998 97 751 00 65"}
              </a>
            </div>
          </div>
          <div className="hero__figure" aria-hidden="true" />
        </div>
      </section>

      <section className="section trust">
        <div className="container trust__row">
          <div className="trust__item">
            <span className="trust__label">Litsenziya</span>
            <span className="trust__value">№{settings?.license_number ?? "1839743"}</span>
          </div>
          <hr className="divider trust__divider" />
          <div className="trust__item">
            <span className="trust__label">Sinflar</span>
            <span className="trust__value">{settings?.grades_offered ?? "1-9-sinflar"}</span>
          </div>
          <hr className="divider trust__divider" />
          <div className="trust__item">
            <span className="trust__label">Oylik to'lov</span>
            <span className="trust__value">
              {settings ? Number(settings.monthly_tuition).toLocaleString("uz-UZ") : "1 990 000"} so'm
            </span>
          </div>
          <hr className="divider trust__divider" />
          <div className="trust__item">
            <span className="trust__label">Manzil</span>
            <span className="trust__value">{settings?.district ?? "Shovot tumani"}</span>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <span className="eyebrow">Ota-onalar fikri</span>
            <h2>Bizga ishonch bildirgan oilalar</h2>
            <div className="testimonial-row">
              {testimonials.slice(0, 3).map((t) => {
                const embedUrl = getYouTubeEmbedUrl(t.video_url);
                return (
                  <article className="testimonial-card" key={t.id}>
                    {embedUrl ? (
                      <div className="testimonial-card__player">
                        <iframe
                          src={embedUrl}
                          title={`${t.author_name} - videointervyu`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : t.video_file ? (
                      <video className="testimonial-card__player" src={t.video_file} controls />
                    ) : t.video_url ? (
                      <a href={t.video_url} target="_blank" rel="noreferrer" className="testimonial-card__video">
                        Videointervyuni ko'rish &rarr;
                      </a>
                    ) : (
                      <p>&laquo;{t.text_quote}&raquo;</p>
                    )}
                    <span className="testimonial-card__author">{t.author_name}, {t.role}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
