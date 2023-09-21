import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";




export default function Search({setSearchQuery}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    }

    return (
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={(e)=>handleSearch(e)}/>
            <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
            </IconButton>
        </Box>
    )
}
