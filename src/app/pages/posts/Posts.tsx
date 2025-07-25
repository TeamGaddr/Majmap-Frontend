import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/postApi";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostInput {
  title: string;
  body: string;
  userId: number;
}

const QUERY_KEYS = {
  posts: "posts",
} as const;

// API functions with explicit return types
const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await api.get<Post[]>("/posts");
  return data;
};

const createPost = async (input: PostInput): Promise<Post> => {
  const { data } = await api.post<Post>("/posts", input);
  return data;
};

const updatePost = async ({
  id,
  data,
}: {
  id: number;
  data: PostInput;
}): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${id}`, data);
  return response.data;
};

const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

function Posts() {
  const queryClient = useQueryClient();
  const [newPost, setNewPost] = useState<PostInput>({
    title: "",
    body: "",
    userId: 1,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch posts with explicit type parameters
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: [QUERY_KEYS.posts],
    queryFn: fetchPosts,
  });

  // Create post mutation with explicit type parameters
  const createPostMutation = useMutation<Post, Error, PostInput>({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.posts] });
    },
  });

  // Update post mutation with explicit type parameters
  const updatePostMutation = useMutation<
    Post,
    Error,
    { id: number; data: PostInput }
  >({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.posts] });
      setEditingId(null);
    },
  });

  // Delete post mutation with explicit type parameters
  const deletePostMutation = useMutation<void, Error, number>({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.posts] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreateOrUpdate = () => {
    if (editingId) {
      updatePostMutation.mutate({
        id: editingId,
        data: newPost,
      });
    } else {
      createPostMutation.mutate(newPost);
    }
    setNewPost({ title: "", body: "", userId: 1 });
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Posts</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreateOrUpdate}
          className="bg-blue-500 text-white p-2"
          disabled={
            createPostMutation.isPending || updatePostMutation.isPending
          }
        >
          {editingId ? "Update Post" : "Create Post"}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setNewPost({ title: "", body: "", userId: 1 });
            }}
            className="ml-2 bg-gray-500 text-white p-2"
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="mt-4">
        {data?.map((post) => (
          <li key={post.id} className="border p-2 mb-2">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.body}</p>
            <button
              onClick={() => {
                setNewPost({
                  title: post.title,
                  body: post.body,
                  userId: post.userId,
                });
                setEditingId(post.id);
              }}
              className="bg-yellow-500 text-white p-1 mr-2"
              disabled={deletePostMutation.isPending}
            >
              Edit
            </button>
            <button
              onClick={() => deletePostMutation.mutate(post.id)}
              className="bg-red-500 text-white p-1"
              disabled={deletePostMutation.isPending}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
