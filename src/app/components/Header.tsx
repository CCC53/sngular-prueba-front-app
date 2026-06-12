"use client";
import { useRouter, usePathname } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { AppBar, Box, Button, InputBase, Toolbar, Typography } from "@mui/material"
import { useFavoriteContext } from "../context/FavoriteContext";

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { search, setSearch } = useFavoriteContext();

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
                    {
                        pathname !== "/" && (
                            <Typography
                                variant="h4"
                                color="textPrimary"
                                sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' } }}
                            >
                                Rick & Morty Character Explorer
                            </Typography>
                        )
                    }
                    {
                        pathname !== "/favoritos" && (
                            <>
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
                                    }}
                                >
                                    <SearchIcon sx={{ color: '#888', mr: 1 }} />
                                    <InputBase
                                        value={search ?? ""}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Buscar..."
                                        inputProps={{ 'aria-label': 'buscar' }}
                                        sx={{ width: '100%' }}
                                    />
                                </Box>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={goToFavoritos}
                                    endIcon={<StarBorderIcon />}
                                >
                                    Mis Favoritos
                                </Button>
                            </>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}