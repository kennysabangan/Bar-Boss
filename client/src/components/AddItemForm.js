import React, { useState } from 'react';
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
   Box
} from '@mui/material';
import axios from 'axios';

export default function AddItemForm(props) {

   const [ name, setName ] = useState("");
   const [ category, setCategory ] = useState("");
   const [ type, setType ] = useState("");
   const [ unitQty, setUnitQty ] = useState("");
   const [ units, setUnits ] = useState("");
   const [ container, setContainer ] = useState("");
   const [ price, setPrice ] = useState("");
   const { products, setProducts, setMounted } = props;

   const addItem = (e) => {
      e.preventDefault();

      axios.post('http://localhost:8000/api/products/add', {
            name,
            category,
            type,
            unitQty,
            units,
            container,
            price
         }, { withCredentials: true })
         .then((res) => {
            setName("");
            setCategory("");
            setType("");
            setUnitQty("");
            setUnits("");
            setContainer("");
            setPrice("")
            setProducts([...products, res.data]);
         })
         .catch(err => console.log(err))
   }

  return (
    <React.Fragment>
      <Divider/>
      <CardContent>
        <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
          <b>Add an Item</b>
        </Typography>
         <Box
            component="form"
            onSubmit={addItem}
            sx={{
               mt: 1,
               display: 'grid',
               gridTemplateColumns: 'repeat(4, auto)',
               columnGap: 6,
               rowGap: 2,
         }}>
            <TextField required
               size="small"
               label="Product Name"
               placeholder='ex: Skyy Peach'
               value={name}
               onChange={e => setName(e.target.value)}
               />
            <TextField required
               size="small"
               label="Category"
               placeholder='ex: Liquor, Mixer'
               value={category}
               onChange={e => setCategory(e.target.value)}
               />
            <TextField required
               size="small"
               label="Type of Product"
               placeholder='ex: Vodka, Juice'
               value={type}
               onChange={e => setType(e.target.value)}
               />
            <TextField required
               size="small"
               label="Unit Qty"
               placeholder='ex: 1 or 8.4'
               value={unitQty}
               onChange={e => setUnitQty(e.target.value)}
               />
            <TextField required
               size="small"
               label="Units"
               placeholder='ex: L, oz'
               value={units}
               onChange={e => setUnits(e.target.value)}
               />
            <TextField required
               size="small"
               label="Container Type"
               placeholder='ex: Bottle, Can'
               value={container}
               onChange={e => setContainer(e.target.value)}
               />
            <FormControl>
               <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
               <OutlinedInput required
                  id="outlined-adornment-amount"
                  size="small"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
               />
            </FormControl>
            <Button type="submit" variant="contained">Add Item</Button>
         </Box>
      </CardContent>
      <Divider/>
    </React.Fragment>
  );
}