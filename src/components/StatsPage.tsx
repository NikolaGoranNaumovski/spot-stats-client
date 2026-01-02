import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Stack,
  Avatar,
  IconButton,
  Button,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  AccessTime,
  CalendarToday,
  DateRange,
  TrendingUp,
  Logout,
  MusicNote,
  PlayArrow,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data generator
const generateMockSongs = (count: number, timeRange: string) => {
  const artists = [
    'The Weeknd',
    'Drake',
    'Billie Eilish',
    'Taylor Swift',
    'Ed Sheeran',
    'Ariana Grande',
    'Post Malone',
    'Dua Lipa',
    'Travis Scott',
    'Olivia Rodrigo',
  ];
  const songNames = [
    'Blinding Lights',
    'Save Your Tears',
    'One Dance',
    'bad guy',
    'Anti-Hero',
    'Shape of You',
    'thank u, next',
    'Circles',
    'Levitating',
    'SICKO MODE',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${timeRange}-${i}`,
    name: songNames[i % songNames.length],
    artist: artists[i % artists.length],
    plays: Math.floor(Math.random() * 500) + 100,
    duration: Math.floor(Math.random() * 180) + 120, // 2-5 minutes
    imageUrl: `https://via.placeholder.com/60/1DB954/FFFFFF?text=${i + 1}`,
  }));
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`stats-tabpanel-${index}`}
      aria-labelledby={`stats-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function StatsPage() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    navigate('/login');
  };

  const handleViewCreatorStats = () => {
    navigate('/creator');
  };

  const timeRanges = [
    { label: 'Hourly', icon: <AccessTime />, data: generateMockSongs(10, 'hourly') },
    { label: '24 Hours', icon: <CalendarToday />, data: generateMockSongs(10, '24h') },
    { label: 'Monthly', icon: <DateRange />, data: generateMockSongs(10, 'monthly') },
    { label: '6 Months', icon: <TrendingUp />, data: generateMockSongs(10, '6months') },
    { label: 'Yearly', icon: <TrendingUp />, data: generateMockSongs(10, 'yearly') },
  ];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%)',
        pb: 6,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'rgba(18, 24, 32, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          py: 2,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <MusicNote sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography
                variant="h5"
                sx={{
                  background: 'linear-gradient(90deg, #1DB954 0%, #00D9FF 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                }}
              >
                SpotStats
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleViewCreatorStats}
                sx={{
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  '&:hover': {
                    borderColor: 'secondary.light',
                    background: 'rgba(0, 217, 255, 0.1)',
                  },
                }}
              >
                Creator Stats
              </Button>
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main' },
                }}
              >
                <Logout />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
            Your Music Stats
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore your most listened tracks across different time ranges
          </Typography>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 3,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3,
              },
            }}
          >
            {timeRanges.map((range, index) => (
              <Tab
                key={index}
                icon={range.icon}
                iconPosition="start"
                label={range.label}
                sx={{ minHeight: 64 }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {timeRanges.map((range, index) => (
          <TabPanel key={index} value={tabValue} index={index}>
            <Stack spacing={2}>
              {range.data.map((song, songIndex) => (
                <Card
                  key={song.id}
                  sx={{
                    background: 'rgba(18, 24, 32, 0.6)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {/* Rank */}
                      <Box
                        sx={{
                          minWidth: 40,
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            background:
                              songIndex < 3
                                ? 'linear-gradient(135deg, #1DB954 0%, #00D9FF 100%)'
                                : 'linear-gradient(135deg, #666 0%, #999 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {songIndex + 1}
                        </Typography>
                      </Box>

                      {/* Album Art */}
                      <Avatar
                        src={song.imageUrl}
                        variant="rounded"
                        sx={{
                          width: 60,
                          height: 60,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        }}
                      />

                      {/* Song Info */}
                      <Stack spacing={0.5} sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {song.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {song.artist}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            size="small"
                            label={`${song.plays} plays`}
                            sx={{
                              bgcolor: 'rgba(29, 185, 84, 0.2)',
                              color: 'primary.main',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {formatDuration(song.duration)}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Play Button */}
                      <IconButton
                        sx={{
                          bgcolor: 'primary.main',
                          color: '#000',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s',
                        }}
                      >
                        <PlayArrow />
                      </IconButton>

                      {/* Progress Bar */}
                      <Box sx={{ width: 100, display: { xs: 'none', md: 'block' } }}>
                        <LinearProgress
                          variant="determinate"
                          value={(song.plays / range.data[0].plays) * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'primary.main',
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </TabPanel>
        ))}
      </Container>
    </Box>
  );
}
