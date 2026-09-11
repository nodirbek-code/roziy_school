import { useEffect, useState } from "react";
import { getSiteSettings, getTeachers } from "../api/endpoints";
import "./about.css";

export default function About() {
  const [settings, setSettings] = useState(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
    getTeachers().then(setTeachers).catch(() => {});
  }, []);

  return (
    <main className="page-shell">
      <div className="container">
        <header className="page-header">
          <div>
            <span className="eyebrow">Maktab haqida</span>
            <h1>{settings?.school_name ?? "Roziy Xalqaro Xususiy Maktabi"}</h1>
            <p>{settings?.tagline}</p>
          </div>
          <div className="page-header__side">
            <span className="eyebrow">Bizning yondashuv</span>
            <strong>Bilim + tarbiya</strong>
            <p>Farzandingizning bugungi rivoji va ertangi imkoniyatlarini birgalikda o'ylaymiz.</p>
          </div>
        </header>

        <section className="license-block">
          <div>
            <span className="eyebrow" style={{ color: "var(--color-gold)" }}>Ishonch va mas'uliyat</span>
            <h2>Rasmiy litsenziya</h2>
            <p>
              "{settings?.license_holder_name ?? "RAZIY XALQARO MAKTABI MChJ"}" &mdash;
              {" "}{settings?.license_activity_type ?? "umumiy o'rta ta'lim xizmatlari"} ko'rsatish
              uchun O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi tomonidan
              berilgan №{settings?.license_number ?? "1839743"}-sonli litsenziyaga ega.
            </p>
          </div>
          {settings?.license_image_front && (
            <img src={settings.license_image_front} alt="Litsenziya" className="license-block__img" />
          )}
        </section>

        {teachers.length > 0 && (
          <section className="section--tight">
            <span className="eyebrow">Jamoamiz</span>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginTop: 10 }}>O'qituvchilar</h2>
            <div className="teacher-grid">
              {teachers.map((t) => (
                <article key={t.id} className="teacher-card">
                  {t.photo && <img src={t.photo} alt={t.full_name} />}
                  <h3>{t.full_name}</h3>
                  {t.subject && <span className="teacher-card__subject">{t.subject}</span>}
                  {t.bio && <p>{t.bio}</p>}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
