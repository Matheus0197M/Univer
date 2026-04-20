import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function PostItem({ post, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const owner = post.profiles?.full_name || post.user_id || "Autor desconhecido";

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    setLoading(false);

    if (error) {
      setError("Erro ao excluir post. Tente novamente.");
      console.error(error);
      return;
    }

    onDelete?.(post.id);
  };

  return (
    <article>
      <header>
        <h2>{post.title}</h2>
        <p>Por: {owner}</p>
      </header>
      <p>{post.content}</p>
      <footer>
        <small>{new Date(post.created_at).toLocaleString()}</small>
        <button type="button" onClick={handleDelete} disabled={loading}>
          {loading ? "Excluindo..." : "Excluir"}
        </button>
        {error && <div>{error}</div>}
      </footer>
    </article>
  );
}
