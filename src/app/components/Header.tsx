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
                <Toolbar
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'stretch', md: 'center' },
                        gap: { xs: 1.5, md: 2 },
                        justifyContent: 'space-between',
                        py: { xs: 2, md: 1 },
                        px: { xs: 2, sm: 3 },
                    }}
                >
                    <Typography
                        variant="h4"
                        color="textPrimary"
                        sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' } }}
                    >
                        Rick & Morty Character Explorer
                    </Typography>
                    {
                        pathname !== "/favoritos" && (
                            <Button
                                variant="contained"
                                onClick={goToFavoritos}
                                sx={{
                                    backgroundColor: '#2C2C2A',
                                    color: '#F1EFE8',
                                    '&:hover': { backgroundColor: '#444441' },
                                    width: { xs: '100%', md: 'auto' },
                                    order: { xs: 3, md: 2 },
                                    flexShrink: 0,
                                }}
                                startIcon={<FavoriteIcon />}
                            >
                                Mis Favoritos
                            </Button>
                        )
                    }
                    {
                        pathname !== "/favoritos" && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#ecf2fe',
                                    borderRadius: '8px',
                                    px: 2,
                                    py: 0.5,
                                    flexGrow: 1,
                                    width: { xs: '100%', md: 'auto' },
                                    maxWidth: { xs: '100%', md: '500px' },
                                    order: { xs: 2, md: 3 },
                                }}
                            >
                                <SearchIcon sx={{ color: '#888', mr: 1 }} />
                                <InputBase onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." inputProps={{ 'aria-label': 'buscar' }} sx={{ width: '100%' }}/>
                            </Box>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}