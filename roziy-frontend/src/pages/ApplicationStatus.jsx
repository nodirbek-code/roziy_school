import { useState } from "react";
import { Link } from "react-router-dom";
import { checkApplicationStatus } from "../api/endpoints";
import "./form.css";

const BADGE_CLASS = { new: "status-result__badge--new", reviewing: "status-result__badge--reviewing", accepted: "status-result__badge--accepted", rejected: "status-result__badge--rejected" };

export default function ApplicationStatus() {
  const [form, setForm] = useState({ tracking_code: "", parent_phone: "" });
  const [state, setState] = useState("idle");
  const [result, setResult] = useState(null);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault(); setState("loading");
    try { const data = await checkApplicationStatus({ tracking_code: form.tracking_code.trim(), parent_phone: form.parent_phone.trim() }); setResult(data); setState("done"); }
    catch (err) { setState(err?.response?.status === 404 ? "notfound" : "error"); }
  };

  return (
    <main className="page-shell"><div className="container" style={{ maxWidth: 820 }}>
      <header className="page-header"><div><span className="eyebrow">Qabul</span><h1>Ariza holatini tekshirish</h1><p>Ariza yuborganingizda berilgan ariza raqami va telefon raqamingizni kiriting.</p></div></header>
      <form className="site-form" onSubmit={handleSubmit}>
        <label>Ariza raqami<input name="tracking_code" placeholder="RZ-123456" value={form.tracking_code} onChange={handleChange} required /></label>
        <label>Telefon raqami<input name="parent_phone" value={form.parent_phone} onChange={handleChange} required /></label>
        <button className="btn btn--primary" type="submit" disabled={state === "loading"}>{state === "loading" ? "Tekshirilmoqda..." : "Holatni ko'rish →"}</button>
        {state === "notfound" && <p style={{ color: "#b42318" }}>Ariza topilmadi. Ariza raqami va telefon raqamini tekshirib qayta urinib ko'ring.</p>}
        {state === "error" && <p style={{ color: "#b42318" }}>Xatolik yuz berdi, qayta urinib ko'ring.</p>}
      </form>
      {state === "done" && result && <div className="status-result">
        <span className={`status-result__badge ${BADGE_CLASS[result.status] ?? ""}`}>{result.status_display}</span>
        <p><strong>{result.child_full_name}</strong>{result.grade ? ` — ${result.grade}` : ""}</p>
        {result.status_note && <p>{result.status_note}</p>}
        <p style={{ color: "var(--color-muted)", fontSize: ".9rem" }}>Ariza raqami: {result.tracking_code} · Yuborilgan sana: {new Date(result.created_at).toLocaleDateString("uz-UZ")}</p>
      </div>}
      <p style={{ marginTop: 28 }}>Hali ariza topshirmadingizmi? <Link to="/qabul">Bu yerdan ariza qoldiring →</Link></p>
    </div></main>
  );
}
