import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Stack, CircularProgress, Alert } from "@mui/material";
import { routes } from "@utils/endpoint";
import type { PostResultType } from "@utils/endpoint";

const HomePage = () => {
  const [posts, setPosts] = useState<PostResultType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      const result = await routes.posts.list();
      setLoading(false);
      if (result.success && Array.isArray(result.data)) setPosts(result.data);
      else if (result.success && !Array.isArray(result.data)) setPosts([]);
      else setError(result.success ? "Unknown error" : result.errors.map(event => event.message).join(" "));
    };
    fetchPosts();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" flex={1} minHeight="100vh" bgcolor="#f5f5f5" p={4}>
      <Box width="100%" maxWidth={600}>
        <Typography variant="h4" mb={3} align="center">Posts</Typography>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error">{error}</Alert>
        )}
        {!loading && !error && posts.length === 0 && (
          <Typography align="center" color="textSecondary">No posts found.</Typography>
        )}
        <Stack spacing={2}>
          {posts.map((post, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>Author ID: {post.author_id}</Typography>
                <Typography variant="body1">{post.content}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;
