import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box className="select-none" component="footer" bgcolor="primary.main" color="white" py={2} mt="auto" display="flex" justifyContent="center" alignItems="center">
      <Typography variant="body2">© 2026 {" "}
        <Link href="https://www.linkedin.com/in/jcontin/" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">João Vitor Vieira Contin</Link>
        {" — "}
        <Link href="https://www.github.com/NukeZzZin" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">GitHub</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
