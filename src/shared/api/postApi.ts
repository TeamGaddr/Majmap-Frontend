import axios from "axios";

// Create global axios instance
export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Posts endpoints
export const getPosts = () => api.get("/posts");
export const createPost = (data: {
  title: string;
  body: string;
  userId: number;
}) => api.post("/posts", data);
export const updatePost = (
  id: number,
  data: { title: string; body: string; userId: number }
) => api.put(`/posts/${id}`, data);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);
