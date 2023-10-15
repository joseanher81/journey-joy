
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {useLogin} from "../../hooks/useLogin";
import MapImage from '../../assets/images/login.jpg';
import GoogleButton from '../../assets/images/sign_in_google_small.png'



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © J. A. Hernández '} 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function LoginPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {error, isPending, login, loginWithGoogle } = useLogin();

    // SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Form fields
        const email = data.get('email');
        const password = data.get('password');

        login(email, password);
      
    // TODO gestionar errores
    };

    // Google sign in
    const handleGoogleSignIn  = () => {
      loginWithGoogle();
    }

    return (
    
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${MapImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Acceder
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Dirección de email"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{
                    '& label.Mui-focused': {
                        color: colors.greenAccent[400] ,
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: colors.greenAccent[400],
                        },
                    },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                    '& label.Mui-focused': {
                        color: colors.greenAccent[400] ,
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: colors.greenAccent[400],
                        },
                    },
                }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {!isPending && (
                <>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                  >
                    Acceder
                  </Button>

                  <Box display="flex" flexDirection="column" alignItems="center" mb="10px" sx={{cursor: "pointer"}}>
                    <img
                      onClick={handleGoogleSignIn}
                      alt="Accede con Google"
                      src={GoogleButton}
                    />
                  </Box>

                </>


                
              )}
              {isPending && (
                <Button
                  disabled
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                >
                  Cargando
                </Button>
              )}


              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2" color={colors.greenAccent[400]}>
                    ¿Has olvidado tu contraseña?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2" color={colors.greenAccent[400]}>
                    {"¿No tienes cuenta? Crear cuenta"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
}