import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import AddBlog from "../components/AddBlog";

type BlogProps = {
  _id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  onDelete: () => void;
};

const Blog: React.FC<BlogProps> = ({
  _id,
  title,
  author,
  url,
  likes,
  onDelete,
}) => {
  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete ${title}?`)) {
      fetch(`http://localhost:3001/api/blogs/${_id}`, {
        method: "DELETE",
      }).then(() => {
        onDelete();
      });
    }
  };

  return (
    <div>
      <Card sx={{ width: "350px", margin: "10px", height: "auto" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography color="text.secondary">{author}</Typography>
          <Typography variant="body2">
            <a href={url} target="_blank">
              {url}
            </a>
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">{likes} likes</Typography>
          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Blog;
