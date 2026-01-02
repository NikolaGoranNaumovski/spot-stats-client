import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  AccessTime,
  CalendarToday,
  DateRange,
  TrendingUp,
  Logout,
  MusicNote,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ClientTimeRange, type Song } from "../types/common";
import { useGet } from "@nnaumovski/react-api-client";
import { useAuth } from "../providers/auth-provider";

// Mock data generator
const generateSongs = (songs: Song[]) => {
  return songs.map((song) => ({
    id: song.name,
    ...song,
    plays: 0,
    duration: 0,
    imageUrl: "",
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
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(ClientTimeRange.HOURLY);

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: ClientTimeRange
  ) => {
    if(newValue === tabValue) return;

    setIsLoading(true);
    setTabValue(newValue);
  };

  const { user, handleLogout } = useAuth();

  const { data, loading } = useGet<Song[]>(
    `/stats/track-stats/${user?.sub}?timeRange=${tabValue}`,
    { urlRefetch: true, skip: !user?.sub }
  );

  const handleViewCreatorStats = () => {
    navigate("/creator");
  };

  const timeRanges = [
    {
      label: "Hourly",
      value: ClientTimeRange.HOURLY,
      icon: <AccessTime />,
      data:
        tabValue === ClientTimeRange.HOURLY ? generateSongs(data || []) : [],
    },
    {
      label: "24 Hours",
      icon: <CalendarToday />,
      value: ClientTimeRange.DAILY,
      data: tabValue === ClientTimeRange.DAILY ? generateSongs(data || []) : [],
    },
    {
      label: "Weekly",
      icon: <CalendarToday />,
      value: ClientTimeRange.WEEKLY,
      data:
        tabValue === ClientTimeRange.WEEKLY ? generateSongs(data || []) : [],
    },
    {
      label: "Monthly",
      icon: <DateRange />,
      value: ClientTimeRange.MONTHLY,
      data:
        tabValue === ClientTimeRange.MONTHLY ? generateSongs(data || []) : [],
    },
    {
      label: "6 Months",
      icon: <TrendingUp />,
      value: ClientTimeRange.SIX_MONTHS,
      data:
        tabValue === ClientTimeRange.SIX_MONTHS
          ? generateSongs(data || [])
          : [],
    },
    {
      label: "Yearly",
      icon: <TrendingUp />,
      value: ClientTimeRange.YEARLY,
      data:
        tabValue === ClientTimeRange.YEARLY ? generateSongs(data || []) : [],
    },
  ];

  useEffect(() => {
    if (loading) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(false);
  }, [loading]);

  console.log({user})

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%)",
        pb: 6,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "rgba(18, 24, 32, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <MusicNote sx={{ fontSize: 32, color: "primary.main" }} />
              <Typography
                variant="h5"
                sx={{
                  background:
                    "linear-gradient(90deg, #1DB954 0%, #00D9FF 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
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
                  borderColor: "secondary.main",
                  color: "secondary.main",
                  "&:hover": {
                    borderColor: "secondary.light",
                    background: "rgba(0, 217, 255, 0.1)",
                  },
                }}
              >
                Creator Stats
              </Button>
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "error.main" },
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
            borderColor: "divider",
            mb: 3,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 3,
              },
            }}
          >
            {timeRanges.map((range, index) => (
              <Tab
                key={index}
                value={range.value}
                icon={range.icon}
                iconPosition="start"
                label={range.label}
                sx={{ minHeight: 64 }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress size={48} />
          </Box>
        ) : (
          timeRanges.filter(item => item.value === tabValue).map((range, index) => (
            <TabPanel key={index} value={0} index={index}>
              <Stack spacing={2}>
                {range.data.map((song, songIndex) => (
                  <Card
                    key={song.id}
                    sx={{
                      background: "rgba(18, 24, 32, 0.6)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {/* Rank */}
                        <Box
                          sx={{
                            minWidth: 40,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 800,
                              background:
                                songIndex < 3
                                  ? "linear-gradient(135deg, #1DB954 0%, #00D9FF 100%)"
                                  : "linear-gradient(135deg, #666 0%, #999 100%)",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
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
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
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
                          {/* <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Chip
                              size="small"
                              label={`${song.plays} plays`}
                              sx={{
                                bgcolor: "rgba(29, 185, 84, 0.2)",
                                color: "primary.main",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatDuration(song.duration)}
                            </Typography>
                          </Stack> */}
                        </Stack>

                        {/* Play Button */}
                        {/* <IconButton
                          sx={{
                            bgcolor: "primary.main",
                            color: "#000",
                            "&:hover": {
                              bgcolor: "primary.dark",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s",
                          }}
                        >
                          <PlayArrow />
                        </IconButton> */}

                        {/* Progress Bar */}
                        {/* <Box
                          sx={{
                            width: 100,
                            display: { xs: "none", md: "block" },
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={(song.plays / range.data[0].plays) * 100}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: "rgba(255, 255, 255, 0.1)",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: "primary.main",
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Box> */}
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </TabPanel>
          ))
        )}
      </Container>
    </Box>
  );
}
