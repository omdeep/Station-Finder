import React from 'react'
import {
    Box, Button, Typography, Modal,
} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Snack from './Snack'
import TestCaseModal from './TestCaseModal'
import axios from 'axios'

const ModalData = ({ modal, handleCloseModal, handleUpdate = () => { } }) => {
    const [snack, setSnack] = React.useState({
        open: false,
        type: 'info',
        msg: ''
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '5px',
        p: 2,
        minWidth: 400
    }

    const changeInProgress = () => {
        axios.patch(`${process.env.REACT_APP_API}requirements/inprogress/${modal.data.id}`)
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
                    msg: 'Unexpected error occured.'
                })
            })
            .finally(() => {
                handleCloseModal()
            })
    }

    return (
        <>
            <Snack snack={snack} setSnack={setSnack} />

            <Modal
                open={modal.open}
                onClose={handleCloseModal}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        {modal.data.name + ' ' + modal.data.address}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Property</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">ID</TableCell>
                                        <TableCell>{modal.data.id}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Station Name</TableCell>
                                        <TableCell>{modal.data.name}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Address</TableCell>
                                        <TableCell>{modal.data.address}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Opening Hours</TableCell>
                                        <TableCell>{modal.data.opening}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Rating</TableCell>
                                        <TableCell>{modal.data.rating}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Region</TableCell>
                                        <TableCell>{
                                            modal.data.region === 1 ? 'Flacq' : modal.data.region === 2 ? 'Grand Port' : modal.data.region === 3 ? 'Moka' : modal.data.region === 4 ? 'Pamplemousses'
                                            : modal.data.region === 5 ? 'Plaines Wilhems' : modal.data.region === 6 ? 'Port Louis' : modal.data.region === 7 ? 'Rivière du Rempart' : modal.data.region === 8 ? 'Rivière Noire' : 'Savanne'
                                        }</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Created Date</TableCell>
                                        <TableCell>{new Date(modal.data.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Status</TableCell>
                                        <TableCell>{modal.data.status === 'open' ? 'Open' : modal.data.status === 'inprogress' ? 'In Progress' : 'Completed'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
                        <Button variant="contained" color="secondary" onClick={handleCloseModal}>Close</Button>
                        {modal.data.status === 'open' &&
                            <Button variant="contained" color="primary" onClick={changeInProgress}>Close</Button>
                        }
                        {modal.data.status === 'inprogress' &&
                            <TestCaseModal id={modal.data.id} handleUpdate={handleUpdate} />
                        }
                        {modal.data.status === 'completed' &&
                            <Button variant="contained" color="primary" onClick={() => window.open(`${process.env.REACT_APP_API}requirements/img/${modal.data.id}`)}>View Testcase</Button>
                        }
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ModalData