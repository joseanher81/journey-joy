import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import MapImage from '../../assets/images/signup.jpeg';
import { useSignup } from '../../hooks/useSignup';
import { FileUploader } from "react-drag-drop-files";
import {useSnackBarContext} from '../../hooks/useSnackBarContext';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © J. A. Hernández '} 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const thumbnailFileTypes = ["JPG", "JPEG", "PNG"];

export default function SignupPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl]  = useState("");
    const [thumbnailError, setThumbnailError] = useState(null);
    const { signUp } = useSignup();
    const {showSnack} = useSnackBarContext();

    // Creates a new user
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Form fields
        const email = data.get('email');
        const password = data.get('password');
        const displayName = data.get('displayName');

        const res = await signUp(email, password, displayName, thumbnail);

        // Error check
        if(res.status === 'error') showSnack(res.message, 'warning');
    };

    // File input handle
    const handleFileChange  = (file) => {
      console.log('entra')
      setThumbnail(null); // First reset any previous file
      setThumbnailError(null); // Reset any previous error
      

      const selected = file;

      // File validations
      if(!selected) {
        setThumbnailError('Please select a file');
        return;
      }
      if(!selected.type.includes('image')) {
        setThumbnailError('Selected file must be an image');
        return;
      }
      if(selected.size > 500000) {
        setThumbnailError('Image file size must be less than 500kb');
        return;
      }

      setThumbnail(selected);
      setThumbnailUrl(`url(${URL.createObjectURL(selected)})`);
      console.log('Thumbnail updated', thumbnailUrl);
      console.log(thumbnailError)
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
              Crear Cuenta
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Dirección de Email"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="displayName"
                label="Nombre de Usuario"
                id="displayName"
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

              <FileUploader
                required
                handleChange={handleFileChange}
                types={thumbnailFileTypes}
                hoverTitle=" "
                dropMessageStyle={{ border: "none" }}
              >
                <Box

                  sx={{
                    width: "100%",
                    height: "250px",
                    cursor: "pointer",
                    marginTop: "20px",
                    border: `2px dashed ${colors.greenAccent[400]}`, 
                    borderRadius: '10px',
                    ...(thumbnail && {
                      backgroundImage: thumbnailUrl,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center"
                    })
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={colors.primary}
                  textAlign="center"
                >
                    {!thumbnail && (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            padding="20px"
                        >
                            <AddPhotoAlternateOutlinedIcon sx={{fontSize: '8vh', color: colors.grey[500]}}/>
                            <Typography variant="h5" color={colors.grey[500]}>Sube o arrastra una imagen aquí</Typography>

                        </Box>
                    
                    )}
                </Box>
              </FileUploader>    

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
              >
                Crear Cuenta
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2" color={colors.greenAccent[400]}>
                    {"¿Ya tienes cuenta? Accede"}
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