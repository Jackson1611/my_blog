import { Box, Container, Grid, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";
import AddBlog from "../components/AddBlog";
import { useEffect, useState } from "react";

type BlogData = {
  _id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdAt: string;
};

type ApiData = {
  blogs: BlogData[];
};

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://localhost:3001/api/blogs")
      .then((response) => response.json())
      .then((data: ApiData) => setBlogs(data.blogs));
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs(blogs.filter((blog) => blog._id !== blogId));
  };

  const saveBlog = (blog: BlogData) => {
    fetch("http://localhost:3001/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
  };
  return (
    <Container>
      <Typography variant="h2">My blog</Typography>
      <Box sx={{ mt: 4 }}>
        <AddBlog saveBlog={saveBlog} />
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid key={blog._id}>
              <BlogCard
                _id={blog._id}
                title={blog.title}
                author={blog.author}
                url={blog.url}
                likes={blog.likes}
                createdAt={blog.createdAt}
                onDelete={() => handleDeleteBlog(blog._id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Blog;
