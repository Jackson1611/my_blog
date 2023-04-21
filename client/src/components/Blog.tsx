import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState, useEffect } from "react";
import AddBlog from "../components/AddBlog";

type BlogProps = {
  _id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdAt: string;
  onDelete: () => void;
};

const Blog: React.FC<BlogProps> = ({
  _id,
  title,
  author,
  url,
  likes,
  createdAt,
  onDelete,
}) => {
  const [numLikes, setNumLikes] = useState(likes);

  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete ${title}?`)) {
      fetch(`http://localhost:3001/api/blogs/${_id}`, {
        method: "DELETE",
      }).then(() => {
        onDelete();
      });
    }
  };

  const timeDiff = () => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const diff = Math.abs(now.getTime() - createdAtDate.getTime());
    console.log(diff);
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
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
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "5px",
          }}
        >
          <Typography variant="body2">{timeDiff()}</Typography>

          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Blog;
