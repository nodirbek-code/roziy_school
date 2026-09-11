import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";

const NAV_LINKS = [
  { to: "/", label: "Bosh sahifa" },
  { to: "/haqida", label: "Maktab haqida" },
  { to: "/talim", label: "Ta'lim" },
  { to: "/taomnoma", label: "Taomnoma" },
  { to: "/ariza-holati", label: "Ariza holati" },
  { to: "/galereya", label: "Galereya" },
  { to: "/yangiliklar", label: "Yangiliklar" },
  { to: "/aloqa", label: "Aloqa" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__row">
        <Link to="/" className="site-header__brand" onClick={() => setOpen(false)}>
          <span className="site-header__brand-name">Roziy</span>
          <span className="site-header__brand-tag">xalqaro maktabi</span>
        </Link>

        <button
          className="site-header__toggle"
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-header__nav ${open ? "is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                "site-header__link" + (isActive ? " is-active" : "")
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/qabul" className="btn btn--primary site-header__cta" onClick={() => setOpen(false)}>
            Qabulga yozilish
          </Link>
        </nav>
      </div>
    </header>
  );
}
