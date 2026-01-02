import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import LoginPage from "./components/LoginPage";
import CallbackPage from "./components/CallbackPage";
import StatsPage from "./components/StatsPage";
import CreatorStatsPage from "./components/CreatorStatsPage";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1DB954", // Spotify green
      dark: "#1AA34A",
      light: "#1ED760",
    },
    secondary: {
      main: "#00D9FF", // Cyan/hacker blue
      dark: "#00B8D4",
      light: "#26E2FF",
    },
    background: {
      default: "#0a0e14", // Very dark blue-gray
      paper: "#121820", // Dark paper
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
    error: {
      main: "#E91E63",
    },
    success: {
      main: "#1DB954",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: "10px 24px",
          fontSize: "1rem",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(29, 185, 84, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(29, 185, 84, 0.3)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
          "&.Mui-selected": {
            color: "#1DB954",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

const isAuthenticated = () => {
  return localStorage.getItem("spotify_access_token") !== null;
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <StatsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/creator" element={<CreatorStatsPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
