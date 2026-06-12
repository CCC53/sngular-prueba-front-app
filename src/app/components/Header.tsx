"use client";
import { useRouter, usePathname } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AppBar, Box, Button, InputBase, Toolbar, Typography } from "@mui/material"
import { useFavoriteContext } from "../context/FavoriteContext";

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { setSearch } = useFavoriteContext();

    const goToFavoritos = () => {
        router.push('/favoritos');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h4" color="textPrimary" noWrap>
                        Rick & Morty Character Explorer
                    </Typography>
                    {
                        pathname !== "/favoritos" && (
                            <Button variant="contained" onClick={goToFavoritos}
                            sx={{ backgroundColor: '#2C2C2A', color: '#F1EFE8', '&:hover': { backgroundColor: '#444441' } }} startIcon={<FavoriteIcon />}>
                                Mis Favoritos
                            </Button>
                        )
                    }
                    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#ecf2fe', borderRadius: '8px', px: 2, py: 0.5, flexGrow: 1, maxWidth: '500px' }}>
                        <SearchIcon sx={{ color: '#888', mr: 1 }} />
                        <InputBase onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." inputProps={{ 'aria-label': 'buscar' }} sx={{ width: '100%' }}/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}