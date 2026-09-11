import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsPost } from "../api/endpoints";
import "./modern-pages.css";

export default function NewsDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => { getNewsPost(slug).then(setPost).catch(() => {}); }, [slug]);
  if (!post) return <main className="page-shell"><div className="container"><div className="empty-state">Yuklanmoqda...</div></div></main>;
  return <main className="page-shell"><div className="container article-shell">
    {post.cover_image && <img className="article-cover" src={post.cover_image} alt={post.title} />}
    <span className="article-meta">{post.published_at ? new Date(post.published_at).toLocaleDateString("uz-UZ") : "Roziy School"}</span>
    <h1 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", marginTop: 12 }}>{post.title}</h1>
    <div className="article-body"><p>{post.body}</p></div>
  </div></main>;
}
