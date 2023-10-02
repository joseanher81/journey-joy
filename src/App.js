import { CssBaseline, ThemeProvider } from "@mui/material";
import {TripsContextProvider } from './context/TripsContext';
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
import OverviewPage from "./pages/overview/OverviewPage";
import { SnackBarContextProvider } from "./context/SnackBarContext";
import SnackBar from "./components/SnackBar";


function App() {
  const [theme, colorMode] = useMode();
  const {user, isAuthReady} = useAuthContext();
  const [searchQuery, setSearchQuery] = useState(''); // Maybe this could go somewhere else

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackBarContextProvider>
            <CssBaseline />
            <div className="app">
              {isAuthReady && (
                <>
                  {/* ROUTES WHEN There is an user logged in */}
                  {user && (
                    <>
                      <Sidebar />
                      <main className="content" style={{'backgroundColor': theme.palette.background}}>
                        <Topbar setSearchQuery={setSearchQuery}/>
                    
                        <TripsContextProvider>
                          <Routes>
                            <Route path="/" element={ <DashboardPage searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> } />
                            <Route path="/new" element={ <CreatePage /> } />
                            <Route path="/trips/:id" element={ <TripPage /> } />
                            <Route path="/overview" element={ <OverviewPage /> } />
                            <Route path="*" element={ <Navigate to='/' />} />
                          </Routes>
                        </TripsContextProvider>

                      </main>
                    </>
                  )}

                  {/* ROUTES WHEN NO user logged in */}  
                  {!user && (
                    <main className="content" style={{'backgroundColor': theme.palette.background}}>
                      <Routes>
                        <Route path="/signup" element={ <SignupPage /> } />
                        <Route path="/login" element={ <LoginPage /> } />   
                        <Route path="*" element={ <Navigate to='/login' />} />
                      </Routes>
                    </main>
                  )}
                </>
              )}
            </div>
            <SnackBar />
          </SnackBarContextProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}


export default App;
