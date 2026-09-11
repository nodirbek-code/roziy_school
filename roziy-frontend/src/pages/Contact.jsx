import { useState } from "react";
import { sendContactMessage } from "../api/endpoints";
import "./form.css";

export default function Contact() {
  const [form, setForm] = useState({ full_name: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => { e.preventDefault(); setStatus("sending"); try { await sendContactMessage(form); setStatus("done"); setForm({ full_name: "", phone: "", message: "" }); } catch { setStatus("error"); } };
  return <main className="page-shell"><div className="container">
    <header className="page-header"><div><span className="eyebrow">Aloqa</span><h1>Biz bilan bog'laning</h1><p>Savolingiz bo'lsa, murojaat qoldiring. Jamoamiz imkon qadar tezroq aloqaga chiqadi.</p></div></header>
    <div className="contact-layout">
      <aside className="contact-info"><span className="eyebrow" style={{ color: "var(--color-gold)" }}>Roziy School</span><h2>Aloqada bo'laylik.</h2><p>Maktab, qabul yoki ta'lim dasturi haqida savollaringiz bo'lsa, bizga yozing.</p><div className="contact-info__item"><strong>Telefon</strong><span>Telefon raqamingizni qoldiring — biz bog'lanamiz.</span></div><div className="contact-info__item"><strong>Javob</strong><span>Murojaatlar maktab jamoasi tomonidan ko'rib chiqiladi.</span></div></aside>
      <form className="site-form" onSubmit={handleSubmit}>
        <label>Ismingiz<input name="full_name" value={form.full_name} onChange={handleChange} required /></label>
        <label>Telefon raqamingiz<input name="phone" value={form.phone} onChange={handleChange} required /></label>
        <label>Xabar<textarea name="message" rows={6} value={form.message} onChange={handleChange} required /></label>
        <button className="btn btn--primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Yuborilmoqda..." : "Xabar yuborish →"}</button>
        {status === "done" && <p style={{ color: "var(--color-teal)" }}>Xabaringiz yuborildi, rahmat!</p>}
        {status === "error" && <p style={{ color: "#b42318" }}>Xatolik yuz berdi, qayta urinib ko'ring.</p>}
      </form>
    </div>
  </div></main>;
}
