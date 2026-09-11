import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsPost } from "../api/endpoints";

export default function NewsDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getNewsPost(slug).then(setPost).catch(() => {});
  }, [slug]);

  if (!post) return <div className="container section">Yuklanmoqda...</div>;

  return (
    <div className="container section" style={{ maxWidth: 760 }}>
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} style={{ borderRadius: 4, marginBottom: 24 }} />
      )}
      <h1>{post.title}</h1>
      <p style={{ whiteSpace: "pre-line" }}>{post.body}</p>
    </div>
  );
}
