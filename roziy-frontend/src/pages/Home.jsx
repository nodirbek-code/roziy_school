import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSiteSettings, getTestimonials } from "../api/endpoints";
import "./home.css";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function Home() {
  const [settings, setSettings] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
    getTestimonials().then(setTestimonials).catch(() => {});
  }, []);

  const tuition = settings ? Number(settings.monthly_tuition).toLocaleString("uz-UZ") : "1 990 000";
  const grades = settings?.grades_offered ?? "1-9-sinflar";
  const district = settings?.district ?? "Shovot tumani";
  const phone = settings?.phone ?? "+998977510065";

  return (
    <>
      <section className="hero">
        <div className="hero__glow hero__glow--one" />
        <div className="hero__glow hero__glow--two" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow hero__eyebrow">{grades} · {settings?.since_year ?? 2026} yildan</span>
            <h1>Farzandingiz uchun <em>bilim, tarbiya</em> va kelajak.</h1>
            <p>{settings?.tagline ?? "Bilim va tarbiya — bizning yo'limiz, rozi ota-ona va baxtli o'quvchi — natijamiz!"}</p>
            <div className="hero__actions">
              <Link to="/qabul" className="btn btn--primary">Qabulga yozilish <span>↗</span></Link>
              <a href={`tel:${phone}`} className="hero__phone">{phone}</a>
            </div>
            <div className="hero__mini-trust">
              <span>✓ Litsenziyalangan maktab</span>
              <span>✓ Zamonaviy ta'lim muhiti</span>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__visual-main">
              <div className="hero__visual-top"><span>ROZIY</span><span>01</span></div>
              <div className="hero__visual-content">
                <span className="hero__visual-label">Maktab falsafasi</span>
                <strong>Har bir bola —<br />alohida imkoniyat.</strong>
              </div>
              <div className="hero__visual-orbit hero__visual-orbit--one" />
              <div className="hero__visual-orbit hero__visual-orbit--two" />
            </div>
            <div className="hero__floating hero__floating--top"><b>№{settings?.license_number ?? "1839743"}</b><span>Litsenziya</span></div>
            <div className="hero__floating hero__floating--bottom"><b>{grades}</b><span>Ta'lim bosqichlari</span></div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats__grid">
          <div><strong>№{settings?.license_number ?? "1839743"}</strong><span>Litsenziya</span></div>
          <div><strong>{grades}</strong><span>Ta'lim yo'nalishi</span></div>
          <div><strong>{tuition} so'm</strong><span>Oylik to'lov</span></div>
          <div><strong>{district}</strong><span>Maktab manzili</span></div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container intro-section__grid">
          <div>
            <span className="eyebrow">Roziy School</span>
            <h2>Oddiy maktab emas. Bolaning imkoniyatini ochadigan muhit.</h2>
          </div>
          <div className="intro-section__copy">
            <p>Biz ta'limni faqat dars va baholar bilan cheklamaymiz. O'quvchining bilim olishi, mustaqil fikrlashi va o'ziga ishonchi birgalikda rivojlanadigan muhit yaratishga intilamiz.</p>
            <Link to="/haqida" className="text-link">Maktab haqida batafsil <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section programs-section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">Ta'lim</span><h2>Farzandingizning keyingi bosqichi shu yerdan boshlanadi.</h2></div>
            <Link to="/talim" className="text-link">Ta'limni ko'rish <span>→</span></Link>
          </div>
          <div className="program-grid">
            <article className="program-card program-card--dark"><span>01</span><div><h3>Mustahkam bilim</h3><p>Asosiy fanlarni chuqur o'zlashtirish va bilimni amalda qo'llashga yo'naltirilgan yondashuv.</p></div><b>↗</b></article>
            <article className="program-card"><span>02</span><div><h3>Individual yondashuv</h3><p>Har bir o'quvchining qiziqishi, kuchli tomonlari va rivojlanishiga e'tibor.</p></div><b>↗</b></article>
            <article className="program-card"><span>03</span><div><h3>Tarbiya va muhit</h3><p>Bilim bilan birga mas'uliyat, hurmat, intizom va mustaqil fikrlashni rivojlantirish.</p></div><b>↗</b></article>
          </div>
        </div>
      </section>

      <section className="section experience-section">
        <div className="container experience__grid">
          <div className="experience__visual"><span>ROZIY</span><strong>01—09</strong><small>Bir muhitda. Bir maqsad bilan.</small></div>
          <div className="experience__copy"><span className="eyebrow">Nega Roziy?</span><h2>Ota-ona xotirjamligi. O'quvchi rivoji.</h2><div className="benefit-list"><div><b>01</b><span><strong>Zamonaviy muhit</strong><small>O'qish va rivojlanish uchun qulay, tartibli maktab muhiti.</small></span></div><div><b>02</b><span><strong>Ochiq muloqot</strong><small>Ota-ona, ustoz va o'quvchi o'rtasidagi hamkorlikni qadrlaymiz.</small></span></div><div><b>03</b><span><strong>Kelajak uchun tayyorgarlik</strong><small>Bilimni hayotiy ko'nikmalar bilan bog'lashga e'tibor beramiz.</small></span></div></div></div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section testimonials-section">
          <div className="container">
            <div className="section-heading"><div><span className="eyebrow">Ota-onalar fikri</span><h2>Bizga ishonch bildirgan oilalar</h2></div></div>
            <div className="testimonial-row">
              {testimonials.slice(0, 3).map((t) => {
                const embedUrl = getYouTubeEmbedUrl(t.video_url);
                return <article className="testimonial-card" key={t.id}>
                  {embedUrl ? <div className="testimonial-card__player"><iframe src={embedUrl} title={`${t.author_name} - videointervyu`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div> : t.video_file ? <video className="testimonial-card__player" src={t.video_file} controls /> : t.video_url ? <a href={t.video_url} target="_blank" rel="noreferrer" className="testimonial-card__video">Videointervyuni ko'rish →</a> : <p>“{t.text_quote}”</p>}
                  <span className="testimonial-card__author">{t.author_name}, {t.role}</span>
                </article>;
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section admission-section">
        <div className="container admission">
          <div><span className="eyebrow">Qabul jarayoni</span><h2>Roziy oilasiga qo'shilish oson.</h2><p>Bir necha oddiy qadam orqali maktabimiz haqida ma'lumot oling va qabul bo'yicha murojaat qiling.</p></div>
          <div className="admission__steps"><div><b>01</b><span>Ariza qoldiring</span></div><div><b>02</b><span>Biz bilan bog'laning</span></div><div><b>03</b><span>Savollaringizni bering</span></div><div><b>04</b><span>Roziy bilan boshlang</span></div></div>
          <Link to="/qabul" className="btn btn--primary">Qabulga murojaat qilish ↗</Link>
        </div>
      </section>
    </>
  );
}
