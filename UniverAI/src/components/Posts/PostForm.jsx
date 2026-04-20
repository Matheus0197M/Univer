import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title: title.trim(),
          content: content.trim(),
          user_id: user.id,
        },
      ])
      .select();

    setLoading(false);

    if (!error && data) {
      setTitle("");
      setContent("");
      onPostCreated?.(data[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Novo Post</h3>

      <div>
        <input
          type="text"
          placeholder="Titulo do post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <textarea
          placeholder="Conteudo do post..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !title.trim() || !content.trim()}
      >
        {loading ? "Publicando..." : "Publicar Post"}
      </button>
    </form>
  );
}
