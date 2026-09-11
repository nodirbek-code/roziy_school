import { useState } from "react";
import { sendContactMessage } from "../api/endpoints";
import "./form.css";

export default function Contact() {
  const [form, setForm] = useState({ full_name: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("done");
      setForm({ full_name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 640 }}>
      <span className="eyebrow">Aloqa</span>
      <h1>Biz bilan bog'laning</h1>
      <p>Savolingiz bo'lsa, quyidagi forma orqali murojaat qoldiring - tez orada aloqaga chiqamiz.</p>

      <form className="site-form" onSubmit={handleSubmit}>
        <label>
          Ismingiz
          <input name="full_name" value={form.full_name} onChange={handleChange} required />
        </label>
        <label>
          Telefon raqamingiz
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Xabar
          <textarea name="message" rows={4} value={form.message} onChange={handleChange} required />
        </label>

        <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Yuborilmoqda..." : "Yuborish"}
        </button>

        {status === "done" && <p style={{ color: "var(--color-teal)" }}>Xabaringiz yuborildi, rahmat!</p>}
        {status === "error" && <p style={{ color: "#b3261e" }}>Xatolik yuz berdi, qayta urinib ko'ring.</p>}
      </form>
    </div>
  );
}
