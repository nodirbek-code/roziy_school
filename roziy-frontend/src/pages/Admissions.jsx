import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGrades, submitApplication } from "../api/endpoints";
import "./form.css";

export default function Admissions() {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({
    child_full_name: "",
    child_birth_date: "",
    grade: "",
    parent_full_name: "",
    parent_phone: "",
    note: "",
  });
  const [status, setStatus] = useState("idle");
  const [trackingCode, setTrackingCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getGrades().then((data) => setGrades(data.results ?? data)).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const result = await submitApplication({ ...form, grade: form.grade || null });
      setTrackingCode(result.tracking_code);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(trackingCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (status === "done") {
    return (
      <div className="container section" style={{ maxWidth: 640 }}>
        <h1>Arizangiz qabul qilindi!</h1>
        <p>Tez orada ko'rsatgan telefon raqamingiz orqali siz bilan bog'lanamiz.</p>

        <div className="tracking-box">
          <span className="tracking-box__label">Sizning ariza raqamingiz</span>
          <div className="tracking-box__code-row">
            <span className="tracking-box__code">{trackingCode}</span>
            <button type="button" className="btn btn--outline" onClick={handleCopy}>
              {copied ? "Nusxalandi ✓" : "Nusxalash"}
            </button>
          </div>
          <p>
            Bu raqamni saqlab qo'ying — <strong>"Ariza holati"</strong> sahifasida telefon raqamingiz bilan
            birga kiritib, arizangiz qaysi bosqichda ekanini istalgan vaqtda tekshirishingiz mumkin.
          </p>
          <Link to="/ariza-holati" className="btn btn--primary">Ariza holatini tekshirish &rarr;</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: 640 }}>
      <span className="eyebrow">Qabul</span>
      <h1>Maktabga yozilish uchun ariza</h1>
      <p>Farzandingiz haqida qisqacha ma'lumot qoldiring, biz siz bilan bog'lanamiz.</p>

      <form className="site-form" onSubmit={handleSubmit}>
        <label>
          Farzandingizning F.I.Sh
          <input name="child_full_name" value={form.child_full_name} onChange={handleChange} required />
        </label>
        <label>
          Tug'ilgan sanasi
          <input type="date" name="child_birth_date" value={form.child_birth_date} onChange={handleChange} />
        </label>
        <label>
          Sinf
          <select name="grade" value={form.grade} onChange={handleChange}>
            <option value="">Tanlang</option>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>{g.title || `${g.number}-sinf`}</option>
            ))}
          </select>
        </label>
        <label>
          Ota-onaning F.I.Sh
          <input name="parent_full_name" value={form.parent_full_name} onChange={handleChange} required />
        </label>
        <label>
          Telefon raqami
          <input name="parent_phone" value={form.parent_phone} onChange={handleChange} required />
        </label>
        <label>
          Qo'shimcha izoh
          <textarea name="note" rows={3} value={form.note} onChange={handleChange} />
        </label>

        <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Yuborilmoqda..." : "Ariza yuborish"}
        </button>

        {status === "error" && <p style={{ color: "#b3261e" }}>Xatolik yuz berdi, qayta urinib ko'ring.</p>}
      </form>
    </div>
  );
}
