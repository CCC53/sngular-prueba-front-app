import Image from "next/image";
import { Character } from "../types/types";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, IconButton, Modal, Typography } from "@mui/material"

export const DetailsModal = ({ char, open, onClose }: { char: Character, open: boolean, onClose: () => void }) => {
    if (!char) return null;

    const statusColor = () => char.status === "Alive" ? 'primary' : char.status === 'Unknown' ? 'warning' : 'error';
    const genderColor = () => char.gender === "Male" ? 'primary' : char.status === 'Genderless' || char.status === 'Unknown' ? 'warning' : 'error';

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: '#ffffff',
                borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.2)', outline: 'none'}}>
                <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff' }}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
                <Image src={char.image} alt="Nombre" width={300} height={300} style={{ width: '100%', height: 'auto', display: 'block' }}/>
                <Box sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ marginBottom: '1em' }} variant="h5">{char.name}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">Status: </Typography>
                            <Chip label={char.status} color={statusColor()}/>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">Gender: </Typography>
                            <Chip label={char.gender} color={genderColor()}/>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">Specie: </Typography>
                            <Chip label={char.species} color="secondary"/>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">Origin: </Typography>
                            <Chip label={char.origin.name} color="success"/>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">Location: </Typography>
                            <Chip label={char.location.name} color="info" />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}