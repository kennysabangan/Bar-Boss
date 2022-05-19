import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from './Title';
import axios from 'axios';

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

const Inventory = (props) => {

   const [ fullInventory, setFullInventory ] = useState([]);
   const [ cost, setCost ] = useState(0);
   const { area } = props;

   useEffect(() => {
      axios.get('http://localhost:8000/api/locations')
         .then(res => {
            const data = res.data;
            var sumOfInventories = []
               data.map((area) => {
                  for (let i = 0; i < area.inventory.length; i++) {
                     if (isProductUnique(sumOfInventories, area.inventory[i])) {
                        sumOfInventories.push(area.inventory[i]);
                     } else {
                        findProductAddQuantity(sumOfInventories, area.inventory[i]);
                     }
                  }
               })
            console.log(sumOfInventories);
            setCost(calculateTotalCost(sumOfInventories))
            setFullInventory(sumOfInventories)
         })
         .catch(err => console.log(err))
  }, [])

   return (
      <React.Fragment>
         { area ?
         <Title>{area} Inventory</Title>
         :
         <Title>Full Inventory</Title>
         }
         <Table size="small">
            <TableHead>
               {fullInventory.length > 0 &&
               <TableRow>
                  <TableCell><b>Product Name</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Type</b></TableCell>
                  <TableCell><b>Size</b></TableCell>
                  <TableCell><b>Container</b></TableCell>
                  <TableCell><b>Quantity</b></TableCell>
               </TableRow>
               }
            </TableHead>
            <TableBody>
               {fullInventory.length > 0 && fullInventory.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.productId.name}</TableCell>
                    <TableCell>{item.productId.category}</TableCell>
                    <TableCell>{item.productId.type}</TableCell>
                    <TableCell>{item.productId.unitQty}{item.productId.units}</TableCell>
                    <TableCell>{item.productId.container}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         {fullInventory.length === 0 &&
            <Typography variant="body1" component="p">
               Nothing here yet. Add items to your Items List and add them to a new Bar Area!
            </Typography>
         }
         <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Typography component='p' variant='body2'><u>Total Inventory Cost</u>: <b>${cost.toFixed(2)}</b></Typography>
         </Box>
      </React.Fragment>
   )
}

export default Inventory;