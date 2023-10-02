import { Box, useTheme } from "@mui/material";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { tokens } from "../theme";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

const drawerWidth = 240;

export default function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {user} = useAuthContext();
  const navigate = useNavigate();

  const menuItems = [
    { 
      text: 'My Trips', 
      icon: <SubjectOutlined color="secondary" fontSize="large"/>, 
      path: '/' 
    },
    { 
      text: 'Create Trip', 
      icon: <AddCircleOutlineOutlined color="secondary" fontSize="large"/>, 
      path: '/new' 
    },
    { 
      text: 'Overview', 
      icon: <QueryStatsOutlinedIcon color="secondary" fontSize="large"/>, 
      path: '/overview' 
    }
  ];

  return (
      <Box>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >

          <Box mb="50px" mt="25px">
              <Box display="flex" justifyContent="center" alignItems="center" paddingLeft="20px" marginBottom="50px">
                <img
                
                  alt="Journey Joy logo"
                  width="100%"
                  height="100%"
                  src={Logo}
                  
                />
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user.photoURL}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  { user.displayName }
                </Typography>
                {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                  Role (NOT IN USE AT THE MOMENT)
                </Typography> */}
              </Box>
            </Box>

          {/* links/list section */}
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                onClick={()=>navigate(item.path)}
                sx={{marginTop: '15px'}}
              >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {/* <ListItemText primary={item.text} /> */}
                  <Typography variant="h5">{item.text}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="caption" sx={{ position: 'absolute', bottom: '20px', left: '20px' }}>v0.2.0</Typography>
        </Drawer>   
      </Box>
  )
}
