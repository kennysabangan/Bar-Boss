import React, { useState } from 'react';
import axios from 'axios';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader, Input, Button, ButtonGroup, FormHelperText, ListItem, TextField, Box, InputAdornment, OutlinedInput, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';

export const MainListItems = () => (
   <React.Fragment>
      <ListItemButton component={Link} to={'/dashboard'}>
         <ListItemIcon>
            <DashboardIcon />
         </ListItemIcon>
         <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to={'/items'}>
         <ListItemIcon>
            <InventoryIcon />
         </ListItemIcon>
         <ListItemText primary="Items List" />
      </ListItemButton>
      <ListItemButton disabled>
         <ListItemIcon>
            <LocalBarIcon />
         </ListItemIcon>
         <ListItemText secondary="Recipes (Coming Soon)" />
      </ListItemButton>
   </React.Fragment>
);

export const SecondaryListItems = () => {

   const [addMode, setAddMode] = useState(false);
   const [areaName, setAreaName] = useState('');
   const [barAreas, setBarAreas] = useState([]);

   const addArea = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post('http://localhost:8000/api/locations/create', { name: areaName })
         console.log(res);
         setAddMode(false);
         setAreaName('');
         setBarAreas([...barAreas, res.data])
      } catch (err) {
         console.log(err);
      }
   }

   useState(() => {
      axios.get('http://localhost:8000/api/locations')
         .then(res => {
            setBarAreas(res.data)
         })
         .catch(err => console.log(err))
   }, [])

   return (
   <React.Fragment>
    <ListSubheader component="div" inset>
      <u>Bar Areas</u>
    </ListSubheader>
    {barAreas.map((area) => (
     <ListItemButton key={area._id} component={Link} to={`/dashboard/${area._id}`}>
       <ListItemIcon>
         <AssignmentIcon />
       </ListItemIcon>
       <ListItemText secondary={area.areaName}/>
     </ListItemButton>
    ))}
     { addMode ?
     <Box component="form" onSubmit={addArea}>
      <ListItemButton selected onClick={() => setAddMode(!addMode)}>
         <ListItemIcon>
            <CancelIcon />
         </ListItemIcon>
         <ListItemText secondary="Cancel: Add Bar Area"/>
      </ListItemButton>
      <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
         <OutlinedInput required
            size="small"
            autoComplete="off"
            value={areaName}
            onChange={e => setAreaName(e.target.value)}
            id="standard-basic"
            placeholder="ex: Front Bar, Storage"
            inputProps={{
              'aria-label': 'weight',
            }}
            aria-describedby="outlined-weight-helper-text"
         />
         { areaName.length > 0 &&
            <FormHelperText id="outlined-weight-helper-text" sx={{ ml: '1ch' }}>Press Enter ↵ to Create Area</FormHelperText>
         }
      </ListItem>
      </Box>
      :
     <ListItemButton onClick={() => setAddMode(!addMode)}>
       <ListItemIcon>
         <AddLocationIcon />
       </ListItemIcon>
       <ListItemText secondary="Add Bar Area"/>
     </ListItemButton>
     }
   </React.Fragment>
 );
}