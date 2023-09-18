import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import SignupPage from "./pages/signup/SignupPage"; 
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";


function App() {
  const [theme, colorMode] = useMode();
  const {user, isAuthReady} = useAuthContext();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthReady && (
            <>
              {user && <Sidebar />}
              <main className="content">
                {user && <Topbar />}
                <Routes>
                  <Route path="/" element={ user ? <DashboardPage /> : <Navigate to='/login' />} />
                  <Route path="/signup" element={ !user ? <SignupPage /> : <Navigate to='/' />} />
                  <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to='/' />} />
                </Routes>
              </main>
            </>
          )}
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}


export default App;
