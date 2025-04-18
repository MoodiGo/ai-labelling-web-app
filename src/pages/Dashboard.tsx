import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { teal } from "@mui/material/colors"
import LogoutIcon from "@mui/icons-material/Logout"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import TimelineIcon from "@mui/icons-material/Timeline"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { userDataService } from "../services/user_data"
import { LabelingSessionService } from "../services/labeling_session_service"

// Create a theme instance with teal as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
  },
})

const Dashboard = () => {
  const [userName, setUserName] = useState("")
  const [sessionActive, setSessionActive] = useState(false)
  const [placesLabeled, setPlacesLabeled] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      if (!auth.getCurrentUser()) return

      try {
        userDataService.getUserInfo()
        .then((userInfo) => {
          if (!userInfo) {
            console.error("User info not found.")
            return
          }
          setUserName(userInfo?.name || "Explorer")
          LabelingSessionService.instance()
          .then((session) => {
            setSessionActive(session.canLabel)
            setPlacesLabeled(session.countPlacesLabeled)
            console.log("Session active:", session.countPlacesLabeled)
          });
        })

      
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const handleSignOut = async () => {
    try {
      auth.signOut()
      navigate("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const startLabeling = () => {
    navigate("/label")
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
        <CircularProgress color="primary" />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading your dashboard...
        </Typography>
      </Box>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Place Labeling Dashboard
            </Typography>
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleSignOut}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Welcome Card */}
            <Grid>
              <Card>
                <CardHeader
                  title={
                    <Box display="flex" alignItems="center">
                      <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Welcome, {userName || "Explorer"}</Typography>
                    </Box>
                  }
                  subheader="Your place labeling journey starts here"
                />
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Box display="flex" alignItems="center">
                        <TimelineIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">Today's Progress</Typography>
                      </Box>
                      <Typography variant="body2" color="primary">
                        {placesLabeled} / 25
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(placesLabeled / 25) * 100}
                      sx={{ height: 8, borderRadius: 5 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {placesLabeled >= 25
                        ? "You've reached the maximum number of places for today."
                        : `You can label ${25 - placesLabeled} more places today.`}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <AccessTimeIcon sx={{ mr: 1 }} />
                      <Typography variant="body1">Session Status</Typography>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                      {sessionActive ? (
                        <Typography variant="body2">
                          You have an active labeling session today with {placesLabeled} places labeled.
                        </Typography>
                      ) : (
                        <Typography variant="body2">You haven't started labeling places today.</Typography>
                      )}
                    </Paper>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={startLabeling}
                    disabled={placesLabeled >= 25}
                    color="primary"
                  >
                    {sessionActive ? "Continue Labeling" : "Start Labeling"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Statistics Card */}
            <Grid>
              <Card>
                <CardHeader title="Statistics" subheader="Your contribution to the community" />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                        <Typography variant="body2" color="text.secondary">
                          Total Places Labeled
                        </Typography>
                        <Typography variant="h4" color="text.primary">
                          {placesLabeled}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                        <Typography variant="body2" color="text.secondary">
                          Streak
                        </Typography>
                        <Typography variant="h4" color="text.primary">
                          1 day
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard;