import type React from "react"

import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Autocomplete as GoogleAutocomplete } from "@react-google-maps/api"
import { auth } from "../firebase"
import { UserInfo } from "../models/UserInfo"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { teal } from "@mui/material/colors"
import LocationOnIcon from "@mui/icons-material/LocationOn"

// Create a theme instance with teal as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
  },
})

const Register = () => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(null)

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      setPlace(place)
      setLocation(`${place.name} - ${place.formatted_address}` || "")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await auth.signup(email, password)
      const user = auth.getCurrentUser()
      if (!user) {
        throw new Error("User not found after signup")
      }

      const locationData = place?.geometry?.location
      const locationLat = locationData ? locationData.lat() : 0
      const locationLon = locationData ? locationData.lng() : 0

      const userDocData = new UserInfo(user.uid, 0, 0, null, user.email!, [], undefined, locationLat, locationLon)
      await userDocData.sendToDb()
      window.location.reload() // Reload the page to update the user info in the app
    } catch (error) {
      console.error("Error creating user:", error)
      setError("Failed to create an account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Card sx={{ mt: 8, width: "100%", boxShadow: 3 }}>
            <CardContent>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                Create an Account
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Sign up to start labeling places
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <GoogleAutocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="A cidade que você mais frequenta"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GoogleAutocomplete>

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
                <Grid container justifyContent="center">
                  <Grid>
                    <MuiLink component={Link} to="/login" variant="body2">
                      {"Already have an account? Sign In"}
                    </MuiLink>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Register
