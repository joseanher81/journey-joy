import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { useLogout } from "../hooks/useLogout";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const {logout, isPending} = useLogout();
  const location = useLocation();

  
  // useEffect(()=> {
  //   console.log("loction",location)
  // }, [location])

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR: Only shown in dashboard */}
      { location.pathname === '/' && (
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        )}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {!isPending && (
          <IconButton onClick={logout}>
            <LogoutOutlinedIcon  />
          </IconButton>
        )}
        {isPending && (
          <IconButton disabled>
            <LogoutOutlinedIcon  />
          </IconButton>
        )}

      </Box>
    </Box>
  );
};

export default Topbar;