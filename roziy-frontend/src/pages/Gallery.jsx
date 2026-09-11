import { useEffect, useState } from "react";
import { getGallery } from "../api/endpoints";
import "./gallery.css";

export default function Gallery() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("all");
  useEffect(() => { getGallery().then((data) => setCategories(data.results ?? data)).catch(() => {}); }, []);
  const visible = active === "all" ? categories : categories.filter((c) => c.slug === active);

  return (
    <main className="page-shell"><div className="container">
      <header className="page-header"><div><span className="eyebrow">Fotogalereya</span><h1>Maktab hayotidan lavhalar</h1><p>Darslar, tadbirlar va kundalik maktab muhitidan tanlangan lahzalar.</p></div></header>
      <div className="gallery-filters">
        <button className={"menu-tabs__btn" + (active === "all" ? " is-active" : "")} onClick={() => setActive("all")}>Barchasi</button>
        {categories.map((c) => <button key={c.id} className={"menu-tabs__btn" + (active === c.slug ? " is-active" : "")} onClick={() => setActive(c.slug)}>{c.name}</button>)}
      </div>
      {visible.map((c) => <section key={c.id} className="gallery-group"><h3>{c.name}</h3><div className="gallery-grid">{c.images.map((img) => <figure key={img.id} className="gallery-item"><img src={img.image} alt={img.caption || c.name} />{img.caption && <figcaption>{img.caption}</figcaption>}</figure>)}</div></section>)}
      {visible.length === 0 && <div className="empty-state">Hozircha galereyada rasmlar mavjud emas.</div>}
    </div></main>
  );
}
