import React, { useEffect, useState } from 'react';
import {
   OutlinedInput,
   InputLabel,
   InputAdornment,
   FormControl,
   Divider,
   TextField,
   Typography,
   Button,
   CardContent,
   Box,
   Input,
   Select,
   MenuItem,
   Link
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function AreaAddItemForm(props) {

   const [ products, setProducts ] = useState([]);
   const [ selectedProduct, setSelectedProduct] = useState("");
   const [ quantity, setQuantity ] = useState(0);
   const { id } = useParams();
   const { setLocation, setMounted } = props;

   const addToInventory = async e => {
      e.preventDefault();
      if (quantity > 0) {
         const productName = document.querySelector("[aria-labelledby='product-select']").innerHTML;
         const res = await axios.put(`http://localhost:8000/api/locations/${id}/add`, { id, itemId: selectedProduct, quantity })
         setMounted(false);
         setLocation(res.data);
         setSelectedProduct("");
         setQuantity("");
         console.log(res.data);
         toast.success(`Successfully added ${quantity} ${productName}!`)
      }
   }

   useEffect(async () => {
      const res = await axios.get('http://localhost:8000/api/products')

      setProducts(res.data)
   }, [])

  return (
    <React.Fragment>
      <Divider/>
      <CardContent>
        <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
          <b>Add an Item</b>
        </Typography>
         <Box
            component="form"
            onSubmit={addToInventory}
            sx={{
               mt: 2,
               display: 'grid',
               gridTemplateColumns: '2fr 1fr 1fr',
               columnGap: 6,
               rowGap: 2,
         }}>
            { products && products.length > 0 &&
            <React.Fragment>
               <FormControl size="small">
                  <InputLabel id="product-select">Product</InputLabel>
                  <Select required
                     labelId="product-select"
                     label="Product"
                     value={selectedProduct}
                     onChange={e => setSelectedProduct(e.target.value)}
                  >
                  {products.length > 0 &&
                     products.map((product) => (
                        <MenuItem key={product._id} value={product._id} data-name={product.name}>{product.name}</MenuItem>
                     ))
                  }
                  </Select>
               </FormControl>
               <TextField required
                  size="small"
                  type="number"
                  label="Quantity"
                  autoComplete="off"
                  value={quantity}
                  error={quantity && quantity <= 0 ? true : false }
                  helperText={quantity && quantity <= 0 ? 'Quantity cannot be negative or zero' : ''}
                  onChange={e => setQuantity(e.target.value)}
                  />
               <Button type="submit" variant="contained" sx={{ height: "2.5rem" }}>Add Item</Button>
            </React.Fragment>
            }
         </Box>
         { products && products.length === 0 &&
            <Typography variant="body1" component="p">
               Before you can add an item to a bar area, create your first item in <Link href="/items">Items List!</Link>
            </Typography>
         }
      </CardContent>
      <Divider/>
      <Toaster/>
    </React.Fragment>
  );
}