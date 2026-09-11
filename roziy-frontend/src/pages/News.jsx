import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../api/endpoints";
import "./modern-pages.css";

export default function News() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { getNews().then((data) => setPosts(data.results ?? data)).catch(() => {}); }, []);

  return (
    <main className="page-shell"><div className="container">
      <header className="page-header"><div><span className="eyebrow">Yangiliklar</span><h1>Maktab hayotidan xabarlar</h1><p>Roziy maktabidagi yangiliklar, tadbirlar va muhim e'lonlar.</p></div></header>
      {posts.length ? <div className="news-grid">{posts.map((post) => <article key={post.id} className="news-card">
        {post.cover_image && <img src={post.cover_image} alt={post.title} />}
        <div className="news-card__body"><span className="news-card__date">{new Date(post.published_at).toLocaleDateString("uz-UZ")}</span><h2><Link to={`/yangiliklar/${post.slug}`}>{post.title}</Link></h2><Link className="btn btn--outline" to={`/yangiliklar/${post.slug}`}>Batafsil →</Link></div>
      </article>)}</div> : <div className="empty-state">Hozircha yangiliklar yo'q.</div>}
    </div></main>
  );
}
