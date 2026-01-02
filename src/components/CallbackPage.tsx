import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export default function CallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    // Simulate OAuth callback processing
    if (code) {
      // In a real app, you would exchange the code for an access token
      // with your backend server, which would then call Spotify's API
      setTimeout(() => {
        navigate('/stats');
      }, 2000);
    } else {
      // No code, redirect back to login
      navigate('/login');
    }
  }, [code, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            p: 6,
            background: 'rgba(18, 24, 32, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
          }}
        >
          <Stack spacing={4} alignItems="center">
            {code ? (
              <>
                <Box sx={{ position: 'relative' }}>
                  <CircularProgress
                    size={80}
                    thickness={4}
                    sx={{
                      color: 'primary.main',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <CheckCircle
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: 40,
                      color: 'secondary.main',
                      animation: 'fadeIn 0.5s ease-in',
                      '@keyframes fadeIn': {
                        from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
                        to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                      },
                    }}
                  />
                </Box>

                <Stack spacing={1}>
                  <Typography
                    variant="h4"
                    sx={{
                      background: 'linear-gradient(90deg, #1DB954 0%, #00D9FF 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 700,
                    }}
                  >
                    Authenticating...
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Processing your Spotify credentials
                  </Typography>
                </Stack>

                {/* Processing steps */}
                <Stack spacing={1} sx={{ width: '100%', maxWidth: 300 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      animation: 'slideIn 0.5s ease-out',
                      '@keyframes slideIn': {
                        from: { opacity: 0, transform: 'translateX(-20px)' },
                        to: { opacity: 1, transform: 'translateX(0)' },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        animation: 'pulse 1s ease-in-out infinite',
                      }}
                    />
                    Validating credentials...
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      animation: 'slideIn 0.7s ease-out',
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'secondary.main',
                        animation: 'pulse 1s ease-in-out infinite 0.3s',
                      }}
                    />
                    Fetching listening history...
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      animation: 'slideIn 0.9s ease-out',
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'secondary.main',
                        animation: 'pulse 1s ease-in-out infinite 0.6s',
                      }}
                    />
                    Preparing dashboard...
                  </Typography>
                </Stack>
              </>
            ) : (
              <Typography variant="body1" color="error">
                Authentication failed. Redirecting...
              </Typography>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
