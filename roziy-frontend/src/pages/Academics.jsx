import { useEffect, useState } from "react";
import { getGrades } from "../api/endpoints";
import "./academics.css";

export default function Academics() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    getGrades().then((data) => setGrades(data.results ?? data)).catch(() => {});
  }, []);

  return (
    <main className="page-shell">
      <div className="container">
        <header className="page-header">
          <div>
            <span className="eyebrow">Ta'lim dasturi</span>
            <h1>Sinflar va rivojlanish xaritasi</h1>
            <p>Har bir bosqichda farzandingiz nimani o'rganishi, qanday ko'nikmalarni rivojlantirishi va qaysi fanlarga e'tibor berilishi bilan tanishing.</p>
          </div>
          <div className="page-header__side">
            <span className="eyebrow">Dastur</span>
            <strong>1–9</strong>
            <p>Umumiy o'rta ta'lim bosqichlari.</p>
          </div>
        </header>

        <div className="grade-list">
          {grades.map((g) => (
            <details key={g.id} className="grade-panel">
              <summary className="grade-panel__summary">{g.title || `${g.number}-sinf`}</summary>
              {g.description && <p className="grade-panel__desc">{g.description}</p>}
              {g.roadmap_items?.length > 0 && (
                <div className="roadmap">
                  <span className="roadmap__eyebrow">Bu sinfda farzandingiz nimalarga erishadi</span>
                  <ul className="roadmap__list">
                    {g.roadmap_items.map((item) => (
                      <li className="roadmap__item" key={item.id}>
                        <span className="roadmap__item-title">{item.title}</span>
                        {item.description && <p className="roadmap__item-desc">{item.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {g.subjects?.length > 0 && (
                <div className="subjects-list">
                  <h4>Fanlar</h4>
                  <ul>
                    {g.subjects.map((s) => <li key={s.id}>{s.name}{s.weekly_hours ? ` · haftasiga ${s.weekly_hours} soat` : ""}</li>)}
                  </ul>
                </div>
              )}
            </details>
          ))}
          {grades.length === 0 && <div className="empty-state">Hozircha sinflar ma'lumoti mavjud emas.</div>}
        </div>
      </div>
    </main>
  );
}
