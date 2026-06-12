import Image from "next/image";
import { Character } from "../types/types";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Chip, Modal, Typography } from "@mui/material"

export const DetailsModal = ({ char, open, onClose }: { char: Character, open: boolean, onClose: () => void }) => {
    if (!char) return null;

    return (
        <Modal open={open}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 'calc(100% - 32px)', sm: 400 },
                maxWidth: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.2)',
                outline: 'none',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1, pt: 1 }}>
                    <Button onClick={onClose} size="small" color="error" endIcon={<CloseIcon fontSize="small" />}>
                        Cerrar
                    </Button>
                </Box>
                <Box sx={{ px: 2 }}>
                    <Image src={char.image} alt="Nombre" width={300} height={300} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}/>
                </Box>
                <Box sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ marginBottom: '1em' }} variant="h5">{char.name}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', width: '100%' }}>
                        <Chip
                            color="primary"
                            label={<Typography variant="body2" component="span">Estado: {char.status}</Typography>}
                        />
                        <Chip
                            color="secondary"
                            label={<Typography variant="body2" component="span">Género: {char.gender}</Typography>}
                        />
                        <Chip
                            color="success"
                            label={<Typography variant="body2" component="span">Especie: {char.species}</Typography>}
                        />
                        <Chip
                            color="warning"
                            label={<Typography variant="body2" component="span">Origen: {char.origin.name}</Typography>}
                        />
                        <Chip
                            color="error"
                            label={<Typography variant="body2" component="span">Ubicación: {char.location.name}</Typography>}
                        />
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}