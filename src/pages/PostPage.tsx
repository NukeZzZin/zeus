import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Typography, Card, CardContent, CircularProgress, Alert } from "@mui/material";
import { routes } from "@utils/endpoint";
import type { PostResultType } from "@utils/endpoint";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("No post identifier provided.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const result = await routes.posts.get(id);
      setLoading(false);
      if (result.success && result.data) setPost(result.data);
      else setError(result.success ? "Unknown error" : result.errors.map(err => err.message).join(" "));
    };
    fetchPost();
  }, [id]);

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" flex={1} minHeight="100vh" bgcolor="#f5f5f5" p={4}>
      <Box width="100%" maxWidth={600}>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error">{error}</Alert>
        )}
        {!loading && !error && post && (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>{post.title}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>Author ID: {post.author_id}</Typography>
              <Typography variant="body1">{post.content}</Typography>
            </CardContent>
          </Card>
        )}
        {!loading && !error && !post && (
          <Typography align="center" color="textSecondary">Post not found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PostPage;
