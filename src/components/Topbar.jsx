import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { ColorModeContext } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useLogout } from "../hooks/useLogout";
import Search from "./Search";

const Topbar = ({setSearchQuery}) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
    const {logout, isPending} = useLogout();
  const location = useLocation();

  return (
    <Box display="flex" justifyContent={location.pathname === '/' ? "space-between" : "flex-end"} p={2} borderBottom={`1px solid rgba(0, 0, 0, 0.12)`}>
      {/* SEARCH BAR: Only shown in dashboard */}
      { location.pathname === '/' && <Search setSearchQuery={setSearchQuery}/>}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
{/*         <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
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