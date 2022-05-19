import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Button, OutlinedInput } from '@mui/material';
import AddItemForm from '../components/AddItemForm';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const Items = () => {

    const [ products, setProducts ] = useState([]);
    const [ editId, setEditId ] = useState("");
    const [ mounted, setMounted ] = useState(false);

    const [ name, setName ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ type, setType ] = useState("");
    const [ unitQty, setUnitQty ] = useState("");
    const [ units, setUnits ] = useState("");
    const [ container, setContainer ] = useState("");
    const [ price, setPrice ] = useState("");

    // If user is not logged in, redirect to Registration Page
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get('usertoken')) {
            navigate('/');
        }

        if (!mounted) {
            axios.get('http://localhost:8000/api/products', { withCredentials: true })
                .then((res) => {
                    setProducts(res.data)
                    setMounted(true);
                    console.log(res.data);
                })
                .catch((err) => console.log(err))
        }
    }, [products])


    const handleEdit = () => {
        axios.put(`http://localhost:8000/api/products/${editId}`, {
            name,
            category,
            type,
            unitQty,
            units,
            container,
            price
        }, { withCredentials: true })
            .then(() => {
                setEditId("");
                setMounted(false);
                setProducts([...products])
            })
    }

    const handleDelete = (e) => {
        const deleteId = e.currentTarget.getAttribute('data');

        axios.delete(`http://localhost:8000/api/products/${deleteId}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                const filteredList = products.filter(product => (
                    product._id !== deleteId
                ))
                setProducts(filteredList)
            })
    }

    return (
    <React.Fragment>
        <Title>Items List</Title>

        <AddItemForm products={products} setProducts={setProducts} setMounted={setMounted} />

        <Table size="small" sx={{ mt: 3 }}>
        <TableHead>
            { products.length > 0 &&
            <TableRow>
                <TableCell><b>Product Name</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Type</b></TableCell>
                <TableCell><b>Unit Qty</b></TableCell>
                <TableCell><b>Units</b></TableCell>
                <TableCell><b>Container Type</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
            </TableRow>
            }
        </TableHead>
        <TableBody>
            {products.map((product, idx) => (
                <TableRow key={idx}>
                    <TableCell>
                        { editId === product._id ?
                            <OutlinedInput size="small" sx={{ minWidth: '10rem' }} value={name} onChange={e => setName(e.target.value)}/>
                            :
                            product.name
                        }
                    </TableCell>
                    <TableCell>
                        { editId === product._id ?
                            <OutlinedInput size="small" value={category} onChange={e => setCategory(e.target.value)}/>
                            :
                            product.category
                        }
                    </TableCell>
                    <TableCell>
                        { editId === product._id ?
                            <OutlinedInput size="small" value={type} onChange={e => setType(e.target.value)}/>
                            :
                            product.type
                        }
                    </TableCell>
                    <TableCell>
                        { editId === product._id ?
                            <OutlinedInput size="small" value={unitQty} onChange={e => setUnitQty(e.target.value)}/>
                            :
                            product.unitQty
                        }
                    </TableCell>
                    <TableCell>
                        { editId === product._id ?
                            <OutlinedInput size="small" value={units} onChange={e => setUnits(e.target.value)}/>
                            :
                            product.units
                        }
                    </TableCell>
                    <TableCell>
                        { editId === product._id ?
                            <OutlinedInput size="small" value={container} onChange={e => setContainer(e.target.value)}/>
                            :
                            product.container
                        }
                    </TableCell>
                    <TableCell>
                        { editId === product._id ?
                            <OutlinedInput size="small" value={price} onChange={e => setPrice(e.target.value)}/>
                            :
                            `$${product.price}`
                        }
                    </TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        { editId === product._id ?
                        <Button
                            onClick={() => setEditId("")}
                            size="large"
                            sx={{ my: '5px' }}
                            color="info"
                        >
                            <EditOffIcon/>
                        </Button>
                        :
                        <Button
                            onClick={() => {
                                setEditId(product._id)
                                setName(product.name)
                                setCategory(product.category)
                                setType(product.type)
                                setUnitQty(product.unitQty)
                                setUnits(product.units)
                                setContainer(product.container)
                                setPrice(product.price)
                            }}
                            size="large"
                        >
                            <EditIcon />
                        </Button>
                        }
                        { editId === product._id &&
                            <Button
                                color="success"
                                onClick={handleEdit}
                                size="large"
                            ><CheckIcon />
                            </Button>
                        }
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
        {products.length === 0 &&
            <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}>
                Nothing here yet. Add your first item in the form above!
            </Typography>
        }
    </React.Fragment>
    )
}

export default Items;