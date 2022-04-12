import React from 'react'
import { Button, Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import AddRequirement from './AddRequirements'
import TestCaseModal from './TestCaseModal'
import ModalData from './ModalData'

const DataNotCompleted = () => {
    const [data, setData] = React.useState([])
    const [id, setId] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [modal, setModal] = React.useState({
        open: false,
        data: {}
    })

    const columns = [
        { field: 'name', headerName: 'Station Name', headerAlign: 'center', width: 150 },
        { field: 'address', headerName: 'Address', headerAlign: 'center', width: 150 },
        { field: 'opening', headerName: 'Opening hours', headerAlign: 'center', flex: 1 },
        {
            field: 'rating', headerName: 'Rating', headerAlign: 'center', width: 80,
            renderCell: (params) => {
                if (params.value === 'Flacq')
                    return <Typography variant='body2' sx={{ backgroundColor: 'crimson', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Grand Port')
                    return <Typography variant='body2' sx={{ backgroundColor: 'goldenrod', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Moka')
                    return <Typography variant='body2' sx={{ backgroundColor: 'mediumseagreen', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Pamplemousses')
                    return <Typography variant='body2' sx={{ backgroundColor: 'peeppink', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Plaine Wilhems')
                    return <Typography variant='body2' sx={{ backgroundColor: 'aqua', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Port Louis')
                    return <Typography variant='body2' sx={{ backgroundColor: 'chartreuse', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Riviere du Rempant')
                    return <Typography variant='body2' sx={{ backgroundColor: 'kakhi', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Riviere Noire')
                    return <Typography variant='body2' sx={{ backgroundColor: 'orange', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Savanne')
                    return <Typography variant='body2' sx={{ backgroundColor: 'orchid', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
            }
        },
        {
            field: 'region', headerName: 'REGION', headerAlign: 'center', width: 150, valueGetter: (params) => {
                if (params.row.region === 1) return 'Flacq'
                else if (params.row.region === 2) return 'Grand Port'
                else if (params.row.region === 3) return 'Moka'
                else if (params.row.region === 4) return 'Pamplemousses'
                else if (params.row.region === 5) return 'Plaines Wilhems'
                else if (params.row.region === 6) return 'Port Louis'
                else if (params.row.region === 7) return 'Rivière du Rempart'
                else if (params.row.region === 8) return 'Rivière Noire'
                else if (params.row.region === 9) return 'Savanne'
            },
            sortComparator: (v1, v2, param1, param2) => {
                return param1.api.getRow(param1.id).region - param2.api.getRow(param2.id).region
            },
            renderCell: (params) => {
                if (params.value === 'Must Have')
                    return <Typography variant='body2' sx={{ backgroundColor: 'crimson', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Should Have')
                    return <Typography variant='body2' sx={{ backgroundColor: 'goldenrod', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Could Have')
                    return <Typography variant='body2' sx={{ backgroundColor: 'mediumseagreen', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Won\'t Have')
                    return <Typography variant='body2' sx={{ backgroundColor: 'gray', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
            }
        },
        {
            field: 'createdAt', headerName: 'Created Date', headerAlign: 'center', width: 180, valueGetter: (params) => {
                return new Date(params.row.createdAt).toLocaleString()
            },
            renderCell: (params) => {
                return <Typography variant='body2' sx={{ border: '1px solid black', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
            }
        },
        {
            field: 'status', headerName: 'Status', headerAlign: 'center', width: 110, valueGetter: (params) => {
                if (params.row.status === 'completed') return 'Completed'
                else if (params.row.status === 'inprogress') return 'In Progress'
                else if (params.row.status === 'open') return 'Open'
                else if (params.row.status === 'obsolete') return 'Obsolete'
            },
            renderCell: (params) => {
                if (params.value === 'Completed')
                    return <Typography variant='body2' sx={{ backgroundColor: 'green', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'In Progress')
                    return <Typography variant='body2' sx={{ backgroundColor: 'orange', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Open')
                    return <Typography variant='body2' sx={{ backgroundColor: 'gray', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
                else if (params.value === 'Obsolete')
                    return <Typography variant='body2' sx={{ backgroundColor: 'pink', color: 'white', borderRadius: '10px', p: 1 }}>{params.value}</Typography>
            }
        }
        // {
        //     field: 'action', headerName: 'Action', headerAlign: 'center', width: 150, sortable: false, renderCell: (params) => {
        //         return <Button variant='contained' onClick={() => {
        //             setId(params.row.id)
        //             setOpen(true)
        //         }}>Upload</Button>
        //     }
        // },
    ]

    React.useEffect(() => {
        handleUpdate()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenModal = (e) => {
        setModal({
            open: true,
            data: e.row
        })
    }

    const handleCloseModal = () => {
        setModal({
            open: false,
            data: {}
        })
    }

    const handleUpdate = () => {
        axios.get(`${process.env.REACT_APP_API}requirements/inprogress`)
            .then(result => {
                const temp = []

                for (let i = 0; i < result.data.length; i++) {
                    temp.push({
                        id: result.data[i]._id,
                        name: result.data[i].name,
                        address: result.data[i].address,
                        opening: result.data[i].opening,
                        rating: result.data[i].rating,
                        region: result.data[i].region,
                        status: result.data[i].status,
                        createdAt: result.data[i].createdAt,
                        updatedAt: result.data[i].updatedAt,
                    })
                }

                setData(temp)
            })
            .catch(err => console.log(err.response.data.error))
    }

    return (
        <>
            <AddRequirement handleUpdate={handleUpdate} />
            {data.length !== 0 &&
                <Container sx={{ mt: 4 }} maxWidth="xl">
                    <Paper>
                        <div style={{ height: '75vh', width: '100%' }}>
                            <DataGrid rows={data} columns={columns} onRowClick={handleOpenModal} disableSelectionOnClick autoPageSize />
                        </div>
                    </Paper>
                    {/* <TestCaseModal id={id} open={open} handleClose={handleClose} handleUpdate={handleUpdate} /> */}
                    <ModalData modal={modal} handleCloseModal={handleCloseModal} handleUpdate={handleUpdate} />
                </Container>
            }
        </>
    )
}

export default DataNotCompleted