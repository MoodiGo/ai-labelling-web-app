import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { MockPlacesApiService, PlacesApiService } from "../services/places_api"
import { userDataService } from "../services/user_data"
import { UserInfo } from "../models/UserInfo"
import { LabelingSessionService } from "../services/labeling_session_service"
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { teal } from "@mui/material/colors"
import HomeIcon from "@mui/icons-material/Home"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SendIcon from "@mui/icons-material/Send"
import StarIcon from "@mui/icons-material/Star"

// Create a theme instance with teal as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
  },
})

const PlaceLabeling = () => {
  const mock = true
  const mockPlaceImageUrl = [
    "https://lh3.googleusercontent.com/places/ANXAkqHNmsWc59aKgwMc3uoAwcDtL-GUbUcAZiyc-0-M-WE7LRrNcNqeL6jEx5qiLTdRpx1gx6tqpLDFqS5Y5B9q00wCUwVsmEIjVIo",
  ]
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([])
  const [currentPlace, setCurrentPlace] = useState<google.maps.places.PlaceResult | null>(null)
  const [placePicUrl, setPlacePicUrl] = useState<string[]>([])
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0)
  const [vibes, setVibes] = useState<string[]>(["", "", ""])
  const [loading, setLoading] = useState<boolean>(true)
  const [hasBeenThere, setHasBeenThere] = useState<boolean>(false)
  const [session, setSession] = useState<LabelingSessionService | null>(null)
  const [placesLabeled, setPlacesLabeled] = useState<number>(0)
  const [error, setError] = useState<string>("")
  const [imageLoading, setImageLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const initSession = async () => {
      if (!auth.getCurrentUser()) {
        navigate("/login")
        return
      }

      try {
        const placesService = new PlacesApiService()
        await placesService.search()
        setPlaces(placesService.resultsList)
        setLoading(false)
        setVibes(["", "", ""])
        LabelingSessionService.instance()
        .then((sess) => {
          setSession(sess)
          setPlacesLabeled(sess.countPlacesLabeled)
        })  
      } catch (error) {
        console.error("Error initializing session:", error)
        setError("Failed to initialize session")
      }
    }

    const initSessionMock = async () => {
      try {
        const placesService = new MockPlacesApiService()
        await placesService.search()
        setPlaces(placesService.resultsList)
        setLoading(false)
        setVibes(["", "", ""])
        LabelingSessionService.instance()
        .then((sess) => {
          setSession(sess)
          setPlacesLabeled(sess.countPlacesLabeled)
        })  
      } catch (error) {
        console.error("Error initializing session:", error)
      }
    }

    const setUser = () => {
      const user = auth.getCurrentUser()
      if (user && user.uid) {
        UserInfo.getFromDb(user.uid).then((userInfo) => {
          if (userInfo) {
            userDataService.setUserInfo(userInfo)
            !mock ? initSession() : initSessionMock()
          }
        })
      }
    }

    setUser()
  }, [])

  useEffect(() => {
    setCurrentPlace(places[currentPlaceIndex] ?? null)
  }, [places, currentPlaceIndex])

  useEffect(() => {
    if (currentPlace) {
      getPicture()
    }
  }, [currentPlace])

  const getPicture = useCallback(async () => {
    if (!currentPlace) return
    setImageLoading(true)
    const urls = await PlacesApiService.getPictureUrl(currentPlace)
    setPlacePicUrl(urls)
    setImageLoading(false)
  }, [currentPlace])

  const handleVibeChange = (index: number, value: string) => {
    const newVibes = [...vibes]
    newVibes[index] = value
    setVibes(newVibes)
  }

  const skipPlace = () => {
    setCurrentPlaceIndex((prev) => prev + 1)
    setVibes(["", "", ""])
    setHasBeenThere(false)
    setError("")
    if (!currentPlace || !currentPlace.place_id) return
    session?.skipPlace(currentPlace.place_id)
  }

  const submitReview = async () => {
    const filteredVibes = vibes.filter((vibe) => vibe.trim() !== "")
    if (filteredVibes.length === 0) {
      setError("Please enter at least one vibe")
      return
    }

    const user = auth.getCurrentUser()
    const userInfo = userDataService.getUserInfo()

    if (!user || !userInfo || !session) return
    const place = places[currentPlaceIndex]
    if (!place.place_id) {
      setError("Invalid place")
      return
    }

    const success = await session.labelPlace(place.place_id, hasBeenThere, filteredVibes)
    if (success) {
      setPlacesLabeled(session?.countPlacesLabeled || 0);
      setCurrentPlaceIndex((prev) => prev + 1)
      setVibes(["", "", ""])
      setHasBeenThere(false)
      setError("")
    } else {
      setError("Failed to submit review")
    }
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (placePicUrl.length <= 1) return

    if (direction === "prev") {
      const prev = (placePicUrl.length + placePicUrl.indexOf(placePicUrl[0]) - 1) % placePicUrl.length
      setPlacePicUrl([...placePicUrl.slice(prev), ...placePicUrl.slice(0, prev)])
    } else {
      const next = (placePicUrl.indexOf(placePicUrl[0]) + 1) % placePicUrl.length
      setPlacePicUrl([...placePicUrl.slice(next), ...placePicUrl.slice(0, next)])
    }
  }

  if (loading || !currentPlace) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
        <CircularProgress color="primary" />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading places to label...
        </Typography>
      </Box>
    )
  }

  if (places.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
        <Card sx={{ maxWidth: 400 }}>
          <CardHeader title="No Places Available" />
          <CardContent>
            <Typography variant="body1">There are no places available for labeling at the moment.</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" fullWidth onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </CardActions>
        </Card>
      </Box>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Place Labeling</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={(placesLabeled / 25) * 100}
                sx={{ width: 120, mr: 1, height: 8, borderRadius: 5 }}
              />
              <Typography variant="body2" color="inherit">
                {placesLabeled} / 25
              </Typography>
            </Box>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ boxShadow: 3 }}>
            {/* Image Section */}
            <Box sx={{ position: "relative" }}>
              {imageLoading && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, bgcolor: "rgba(0,0,0,0.1)" }}
                >
                  <CircularProgress color="primary" />
                </Box>
              )}

              {currentPlace?.photos && placePicUrl.length > 0 ? (
                <CardMedia
                  component="img"
                  height="400"
                  image={mock ? mockPlaceImageUrl[0] : placePicUrl[0]}
                  alt={currentPlace.name || "Place"}
                  onLoad={() => setImageLoading(false)}
                />
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: 400, bgcolor: "grey.200" }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No Image Available
                  </Typography>
                </Box>
              )}

              {placePicUrl.length > 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 16px",
                  }}
                >
                  <IconButton sx={{ bgcolor: "rgba(255,255,255,0.7)" }} onClick={() => navigateImage("prev")}>
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton sx={{ bgcolor: "rgba(255,255,255,0.7)" }} onClick={() => navigateImage("next")}>
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            <CardHeader title={currentPlace?.name} subheader={currentPlace?.vicinity} />

            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {currentPlace?.types?.map((type, index) => (
                    <Chip key={index} label={type.replace(/_/g, " ")} size="small" color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasBeenThere}
                    onChange={(e) => setHasBeenThere(e.target.checked)}
                    color="primary"
                  />
                }
                label="I've been to this place before"
              />

              <Box sx={{ mt: 3 }}>
                <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                  <StarIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">What vibes/moods do you associate with this place?</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Enter up to 3 moods you feel when thinking about this place.
                </Typography>

                <Grid container spacing={2}>
                  {[0, 1, 2].map((index) => (
                    <Grid key={index}>
                      <TextField
                        fullWidth
                        label={`Vibe/Mood ${index + 1}`}
                        value={vibes[index]}
                        onChange={(e) => handleVibeChange(index, e.target.value)}
                        variant="outlined"
                        inputProps={{ maxLength: 30 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
              <Button variant="outlined" startIcon={<SkipNextIcon />} onClick={skipPlace}>
                Skip this place
              </Button>
              <Button variant="contained" endIcon={<SendIcon />} onClick={submitReview}>
                Submit & Continue
              </Button>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default PlaceLabeling
