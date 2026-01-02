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
  Divider,
} from '@mui/material';
import {
  AccessTime,
  CalendarToday,
  DateRange,
  TrendingUp,
  ArrowBack,
  MusicNote,
  PlayArrow,
  Favorite,
  Share,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock creator data
const creatorInfo = {
  name: 'SpotStats Creator',
  username: '@spotstats',
  avatar: 'https://via.placeholder.com/120/1DB954/FFFFFF?text=SC',
  totalPlays: 125840,
  totalHours: 4528,
  topGenres: ['Electronic', 'Indie', 'Hip Hop', 'Alternative'],
};

// Mock data generator for creator
const generateCreatorSongs = (_count: number, timeRange: string) => {
  const songs = [
    { name: 'Midnight City', artist: 'M83', genre: 'Electronic' },
    { name: 'Shelter', artist: 'Porter Robinson & Madeon', genre: 'Electronic' },
    { name: 'Do I Wanna Know?', artist: 'Arctic Monkeys', genre: 'Alternative' },
    { name: 'Runaway', artist: 'Kanye West', genre: 'Hip Hop' },
    { name: 'Redbone', artist: 'Childish Gambino', genre: 'R&B' },
    { name: 'Electric Feel', artist: 'MGMT', genre: 'Indie' },
    { name: 'Strobe', artist: 'deadmau5', genre: 'Electronic' },
    { name: 'Take Me Out', artist: 'Franz Ferdinand', genre: 'Alternative' },
    { name: 'Nights', artist: 'Frank Ocean', genre: 'R&B' },
    { name: 'HUMBLE.', artist: 'Kendrick Lamar', genre: 'Hip Hop' },
  ];

  return songs.map((song, i) => ({
    id: `${timeRange}-${i}`,
    ...song,
    plays: Math.floor(Math.random() * 800) + 200,
    duration: Math.floor(Math.random() * 240) + 180,
    imageUrl: `https://via.placeholder.com/60/${i % 2 === 0 ? '1DB954' : '00D9FF'}/FFFFFF?text=${i + 1}`,
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
      id={`creator-tabpanel-${index}`}
      aria-labelledby={`creator-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CreatorStatsPage() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    navigate('/login');
  };

  const timeRanges = [
    { label: 'Hourly', icon: <AccessTime />, data: generateCreatorSongs(10, 'hourly') },
    { label: '24 Hours', icon: <CalendarToday />, data: generateCreatorSongs(10, '24h') },
    { label: 'Monthly', icon: <DateRange />, data: generateCreatorSongs(10, 'monthly') },
    { label: '6 Months', icon: <TrendingUp />, data: generateCreatorSongs(10, '6months') },
    { label: 'Yearly', icon: <TrendingUp />, data: generateCreatorSongs(10, 'yearly') },
  ];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
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
              <IconButton onClick={handleBack} sx={{ color: 'text.secondary' }}>
                <ArrowBack />
              </IconButton>
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
                Creator's Stats
              </Typography>
            </Stack>
            <Chip
              label="Public View"
              size="small"
              sx={{
                bgcolor: 'rgba(0, 217, 255, 0.2)',
                color: 'secondary.main',
                fontWeight: 600,
              }}
            />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Creator Profile Card */}
        <Card
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(0, 217, 255, 0.1) 100%)',
            border: '1px solid rgba(29, 185, 84, 0.3)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
              {/* Avatar */}
              <Avatar
                src={creatorInfo.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 8px 24px rgba(29, 185, 84, 0.3)',
                }}
              />

              {/* Info */}
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Stack spacing={0.5}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {creatorInfo.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {creatorInfo.username}
                  </Typography>
                </Stack>

                <Divider sx={{ opacity: 0.1 }} />

                {/* Stats Grid */}
                <Stack direction="row" spacing={4} flexWrap="wrap">
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {formatNumber(creatorInfo.totalPlays)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Plays
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      {formatNumber(creatorInfo.totalHours)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Hours Listened
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.light' }}>
                      {creatorInfo.topGenres.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Top Genres
                    </Typography>
                  </Box>
                </Stack>

                {/* Top Genres */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {creatorInfo.topGenres.map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(29, 185, 84, 0.2)',
                        color: 'primary.light',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Stack>
              </Stack>

              {/* Action Buttons */}
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<Favorite />}
                  sx={{
                    background: 'linear-gradient(90deg, #1DB954 0%, #1ED760 100%)',
                  }}
                >
                  Follow
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  sx={{
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                  }}
                >
                  Share
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

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
                backgroundColor: 'secondary.main',
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
                                ? 'linear-gradient(135deg, #00D9FF 0%, #1DB954 100%)'
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
                              bgcolor: 'rgba(0, 217, 255, 0.2)',
                              color: 'secondary.main',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                          <Chip
                            size="small"
                            label={song.genre}
                            sx={{
                              bgcolor: 'rgba(29, 185, 84, 0.2)',
                              color: 'primary.main',
                              fontSize: '0.7rem',
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
                          bgcolor: 'secondary.main',
                          color: '#000',
                          '&:hover': {
                            bgcolor: 'secondary.dark',
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
                              bgcolor: 'secondary.main',
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
