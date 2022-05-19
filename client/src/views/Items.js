import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import AddItemForm from '../components/AddItemForm';

const Items = () => {

    const [ products, setProducts ] = useState([]);

    // If user is not logged in, redirect to Registration Page
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get('usertoken')) {
            navigate('/');
        }

        axios.get('http://localhost:8000/api/products', { withCredentials: true })
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
    <React.Fragment>
        <Title>Items List</Title>

        <AddItemForm products={products} setProducts={setProducts}/>

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
            </TableRow>
            }
        </TableHead>
        <TableBody>
            {products.map((product, idx) => (
                <TableRow key={idx}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.unitQty}</TableCell>
                    <TableCell>{product.units}</TableCell>
                    <TableCell>{product.container}</TableCell>
                    <TableCell>${product.price}</TableCell>
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