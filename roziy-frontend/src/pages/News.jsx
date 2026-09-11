import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../api/endpoints";

export default function News() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getNews().then((data) => setPosts(data.results ?? data)).catch(() => {});
  }, []);

  return (
    <div className="container section">
      <span className="eyebrow">Yangiliklar</span>
      <h1>Maktab hayotidan xabarlar</h1>

      <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
        {posts.map((post) => (
          <article key={post.id} style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: 24 }}>
            {post.cover_image && (
              <img src={post.cover_image} alt={post.title} style={{ borderRadius: 4, marginBottom: 12, maxHeight: 260, objectFit: "cover", width: "100%" }} />
            )}
            <h2 style={{ marginBottom: 4 }}>
              <Link to={`/yangiliklar/${post.slug}`} style={{ textDecoration: "none" }}>{post.title}</Link>
            </h2>
            <span style={{ color: "var(--color-teal)", fontSize: "0.85rem" }}>
              {new Date(post.published_at).toLocaleDateString("uz-UZ")}
            </span>
          </article>
        ))}
        {posts.length === 0 && <p>Hozircha yangiliklar yo'q.</p>}
      </div>
    </div>
  );
}
