"use client";
import { AppBar, Box, Button, InputBase, Toolbar, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from "next/navigation";

export const Header = () => {
    const router = useRouter();

    const goToFavoritos = () => {
        router.push('/favoritos')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h4" color="secondary" noWrap>
                        Rick & Morty Character Explorer
                    </Typography>
                    <Button variant="contained" color="secondary" startIcon={<FavoriteIcon />} onClick={goToFavoritos}>Mis Favoritos</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#ecf2fe', borderRadius: '8px', px: 2, py: 0.5, flexGrow: 1, maxWidth: '500px' }}>
                        <SearchIcon sx={{ color: '#888', mr: 1 }} />
                        <InputBase placeholder="Buscar..." inputProps={{ 'aria-label': 'buscar' }} sx={{ width: '100%' }}/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}