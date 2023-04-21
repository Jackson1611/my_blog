import { useState } from "react";
import { TextField, Button } from "@mui/material";

interface Blog {
  title: string;
  author: string;
  url: string;
  likes: number;
}

const AddBlog = (props: any) => {
  const [blog, setBlog] = useState<Blog>({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      blog.title.trim() === "" ||
      blog.author.trim() === "" ||
      blog.url.trim() === ""
    ) {
      window.alert("Please fill all fields");
      return;
    }
    props.saveBlog(blog);
    setBlog({ title: "", author: "", url: "", likes: 0 });
  };

  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "60px",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        style={{ marginRight: "8px" }}
        name="title"
        label="Title"
        value={blog.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <TextField
        style={{ marginRight: "8px" }}
        name="author"
        label="Author"
        value={blog.author}
        onChange={handleInputChange}
        placeholder="Author"
      />
      <TextField
        style={{ marginRight: "8px" }}
        name="url"
        label="URL"
        value={blog.url}
        onChange={handleInputChange}
        placeholder="URL"
      />
      <Button variant="contained" type="submit">
        Add Blog
      </Button>
    </form>
  );
};

export default AddBlog;
