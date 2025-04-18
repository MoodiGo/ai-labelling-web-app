import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import { userDataService } from "../services/user_data"
import { UserInfo } from "../models/UserInfo"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { teal } from "@mui/material/colors"

// Create a theme instance with teal as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
  },
})

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await auth.signIn(email, password)

      const currentUser = auth.getCurrentUser()
      if (!currentUser) {
        throw new Error("User not found")
      }

      const userInfo = await UserInfo.getFromDb(currentUser.uid)

      if (!userInfo) {
        throw new Error("User info not found")
      }

      userDataService.setUserInfo(userInfo)

      window.location.reload() // Reload the page to update the user info in the app
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
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
                Sign In
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Enter your credentials to access your account
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Grid container justifyContent="space-between" alignItems="center">
                  <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                  <MuiLink href="#" variant="body2">
                    Forgot password?
                  </MuiLink>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
                <Grid container justifyContent="center">
                  <Grid>
                    <MuiLink component={Link} to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
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

export default Login
