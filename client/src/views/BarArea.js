import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/Title';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';
import AreaAddItemForm from '../components/AreaAddItemForm';

function isProductUnique(arr, item) {
   let unique = true;
   for (let i = 0; i < arr.length; i++) {
       if (arr[i].productId._id == item.productId._id) {
           return false;
       }
   }
   return unique
}

function findProductAddQuantity(arr, item) {
   for (let i = 0; i < arr.length; i++) {
       if (arr[i].productId._id == item.productId._id) {
           arr[i].quantity += item.quantity
       }
   }
}

function calculateTotalCost(arr) {
    let cost = 0;
    for (let i = 0; i < arr.length; i++) {
       cost += arr[i].quantity * arr[i].productId.price;
    }
    return cost;
 }

const BarArea = () => {

    const [ inventory, setInventory ] = useState([]);
    const [ location, setLocation ] = useState({});
    const [ mounted, setMounted ] = useState(false);
    const [ cost, setCost ] = useState(0);
    const { id } = useParams();

    // If user is not logged in, redirect to Registration Page
    const navigate = useNavigate();
    useEffect(() => {
      if (!Cookies.get('usertoken')) {
          navigate('/');
      }

      if (!mounted) {
          axios.get('http://localhost:8000/api/locations/' + id)
              .then(res => {
                   var data = res.data.inventory;
                   console.log(res.data.inventory);
                   setLocation(res.data);
                   setMounted(true);
                   var concatInventory = []

                   data.map((item) => {
                      if (isProductUnique(concatInventory, item)) {
                         concatInventory.push(item);
                      } else {
                         findProductAddQuantity(concatInventory, item);
                      }
                   })
                   setCost(calculateTotalCost(concatInventory))
                   setInventory([...concatInventory])
              })
      }

  }, [id, location])

    return (
    <React.Fragment>
        <Title>{location.areaName}: Inventory</Title>

        <AreaAddItemForm setLocation={setLocation} setMounted={setMounted}/>

        <Table size="small" sx={{ mt: 3 }}>
        <TableHead>
            { inventory.length > 0 &&
            <TableRow>
                <TableCell><b>Product Name</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Type</b></TableCell>
                <TableCell><b>Unit Qty</b></TableCell>
                <TableCell><b>Units</b></TableCell>
                <TableCell><b>Container Type</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Quantity</b></TableCell>
            </TableRow>
            }
        </TableHead>
        <TableBody>
            { inventory.length > 0 && inventory.map((product, idx) => (
                <TableRow key={idx}>
                    <TableCell>{product.productId.name}</TableCell>
                    <TableCell>{product.productId.category}</TableCell>
                    <TableCell>{product.productId.type}</TableCell>
                    <TableCell>{product.productId.unitQty}</TableCell>
                    <TableCell>{product.productId.units}</TableCell>
                    <TableCell>{product.productId.container}</TableCell>
                    <TableCell>${product.productId.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
        {inventory.length === 0 &&
            <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}>
                Nothing here yet. Add your first item in the form above!
            </Typography>
        }
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Typography component='p' variant='body2'><u>{location.areaName} Inventory Cost</u>: <b>${cost.toFixed(2)}</b></Typography>
        </Box>
    </React.Fragment>
    )
}

export default BarArea;