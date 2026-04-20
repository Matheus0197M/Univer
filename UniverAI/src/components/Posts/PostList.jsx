import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles (full_name)")
        .order("created_at", { ascending: false });

      if (error) console.error("Erro ao buscar posts:", error);
      if (data) setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
    );
  };

  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  if (loading) return <div>Carregando posts...</div>;

  return (
    <div>
      <PostForm onPostCreated={handlePostCreated} />
      <div>
        {posts.length === 0 ? (
          <p>Nenhum post ainda. Seja o primeiro a publicar!</p>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onUpdate={handlePostUpdate}
              onDelete={handlePostDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
