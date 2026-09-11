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
    <div className="container section">
      <span className="eyebrow">Maktab haqida</span>
      <h1>{settings?.school_name ?? "Roziy Xalqaro Xususiy Maktabi"}</h1>
      <p>{settings?.tagline}</p>

      <div className="license-block">
        <div>
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
      </div>

      {teachers.length > 0 && (
        <section className="section--tight">
          <span className="eyebrow">Jamoamiz</span>
          <h2>O'qituvchilar</h2>
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
  );
}
