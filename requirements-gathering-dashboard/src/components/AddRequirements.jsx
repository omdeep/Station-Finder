import React from 'react'
import {
    Box, Button, Container, Typography, Modal, Slider,
    TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import Snack from './Snack'

const AddRequirements = ({ handleUpdate }) => {
    const [open, setOpen] = React.useState(false)
    const [snack, setSnack] = React.useState({
        open: false,
        type: 'info',
        msg: ''
    })
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            rating: 50,
            region: 9,
            status: 'open'
        }
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '5px',
        p: 2,
    }

    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_API}requirements`, data)
            .then(() => {
                setSnack({
                    open: true,
                    type: 'success',
                    msg: 'Success!'
                })
                handleUpdate()
            })
            .catch(() => {
                setSnack({
                    open: true,
                    type: 'error',
                    msg: 'Error!'
                })
            })
            .finally(() => {
                reset()
                setOpen(false)
            })
    }

    return (
        <>
            <Snack snack={snack} setSnack={setSnack} />

            <Container maxWidth="xl">
                <Box sx={{ my: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Add Station</Button>
                </Box>
            </Container>

            <Modal
                open={open}
                onClose={() => {
                    reset()
                    setOpen(false)
                }}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Add new Station
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ my: 2 }}>
                                <TextField fullWidth label="Name" variant="outlined" {...register("name", { required: true })} />
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <TextField fullWidth label="Address" variant="outlined" {...register("address", { required: true })} />
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <TextField fullWidth label="Opening Hours" variant="outlined" multiline rows={4} {...register("opening", { required: true })} />
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <FormControl>
                                    <InputLabel id="region">Region</InputLabel>
                                    <Controller
                                        name="region"
                                        control={control}
                                        render={({ field }) => (
                                            <Select fullWidth labelId="region" label="Region" {...field}>
                                                <MenuItem value={1}>Flacq</MenuItem>
                                                <MenuItem value={2}>Grand Port</MenuItem>
                                                <MenuItem value={3}>Moka</MenuItem>
                                                <MenuItem value={4}>Pamplemousses</MenuItem>
                                                <MenuItem value={5}>Plaines Wilhems</MenuItem>
                                                <MenuItem value={6}>Port Louis</MenuItem>
                                                <MenuItem value={7}>Rivière du Rempart</MenuItem>
                                                <MenuItem value={8}>Rivière Noire</MenuItem>
                                                <MenuItem value={9}>Savanne</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <FormControl>
                                    <InputLabel id="status">Status</InputLabel>
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Select fullWidth labelId="status" label="status" {...field}>
                                                <MenuItem value='open'>Open</MenuItem>
                                                <MenuItem value='inprogress'>Close</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <InputLabel id="rating">Rating</InputLabel>
                                <Controller
                                    name="rating"
                                    control={control}
                                    render={({ field }) => (
                                        <Slider
                                            {...field}
                                            valueLabelDisplay="auto"
                                            min={1}
                                            max={100}
                                            label="Rating"
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
                                <Button variant="contained" color="secondary" onClick={() => {
                                    reset()
                                    setOpen(false)
                                }}>Close</Button>
                                <Button variant="contained" color="primary" type="submit">Add</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default AddRequirements