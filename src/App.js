import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import SignupPage from "./pages/signup/SignupPage"; 
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CreatePage from "./pages/create/CreatePage";
import TripPage from "./pages/trip/TripPage";
import { useState } from "react";


function App() {
  const [theme, colorMode] = useMode();
  const {user, isAuthReady} = useAuthContext();
  const [searchQuery, setSearchQuery] = useState(''); // Maybe this could go somewhere else

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <div className="app">
            {isAuthReady && (
              <>
                {user && <Sidebar />}
                <main className="content" style={{'background-color': theme.palette.background}}>
                  {user && <Topbar setSearchQuery={setSearchQuery}/>}
                  <Routes>
                    <Route path="/" element={ user ? <DashboardPage searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> : <Navigate to='/login' />} />
                    <Route path="/new" element={ user ? <CreatePage /> : <Navigate to='/login' />} />
                    <Route path="/trips/:id" element={ user ? <TripPage /> : <Navigate to='/login' />} />
                    <Route path="/signup" element={ !user ? <SignupPage /> : <Navigate to='/' />} />
                    <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to='/' />} />   
                  </Routes>
                </main>
              </>
            )}
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}


export default App;
