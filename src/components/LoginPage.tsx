import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GraphicEq, MusicNote } from "@mui/icons-material";
import { useAuth } from "../providers/auth-provider";

export default function LoginPage() {
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const handleViewCreatorStats = () => {
    navigate("/creator");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29,185,84,0.1) 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.3, transform: "scale(1)" },
            "50%": { opacity: 0.6, transform: "scale(1.1)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)",
          animation: "pulse 5s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />

      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 6,
            background: "rgba(18, 24, 32, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Stack spacing={4} alignItems="center">
            {/* Logo/Icon */}
            <Box sx={{ position: "relative" }}>
              <GraphicEq
                sx={{
                  fontSize: 80,
                  color: "primary.main",
                  filter: "drop-shadow(0 0 20px rgba(29, 185, 84, 0.5))",
                }}
              />
              <MusicNote
                sx={{
                  position: "absolute",
                  top: 10,
                  right: -20,
                  fontSize: 40,
                  color: "secondary.main",
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                  },
                }}
              />
            </Box>

            {/* Title */}
            <Stack spacing={1}>
              <Typography
                variant="h2"
                sx={{
                  background:
                    "linear-gradient(90deg, #1DB954 0%, #00D9FF 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 800,
                }}
              >
                SpotStats
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Your listening history, visualized
              </Typography>
            </Stack>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 400 }}
            >
              Connect your Spotify account to view detailed analytics about your
              most listened tracks across hourly, daily, monthly, and yearly
              timeframes.
            </Typography>

            {/* Login Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleLogin}
              sx={{
                py: 2,
                fontSize: "1.1rem",
                background: "linear-gradient(90deg, #1DB954 0%, #1ED760 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #1AA34A 0%, #1DB954 100%)",
                  transform: "scale(1.02)",
                },
                transition: "all 0.2s",
              }}
            >
              Connect with Spotify
            </Button>

            {/* Creator Stats Link */}
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleViewCreatorStats}
              sx={{
                py: 2,
                fontSize: "1rem",
                borderColor: "secondary.main",
                color: "secondary.main",
                "&:hover": {
                  borderColor: "secondary.light",
                  background: "rgba(0, 217, 255, 0.1)",
                },
              }}
            >
              View Creator's Stats
            </Button>

            {/* Footer Note */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, fontSize: "0.75rem" }}
            >
              Note: This is a demo application. Spotify credentials are
              placeholder values.
              <br />
              Replace with real Spotify OAuth credentials in production.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
