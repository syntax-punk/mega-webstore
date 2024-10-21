import { Box, Typography, Button } from '@mui/material'
import { useState } from 'react'

export default function DemoAppWarning() {
  const [openDialog, setOpenDialog] = useState(true);
  const boxStyles = { 
    position: "fixed", 
    top: "25%", 
    border: "12px solid red", 
    backgroundColor: "#FFF", 
    boxShadow: "12px 12px black, -12px -12px black",
    zIndex: 10,
  } as React.CSSProperties;
  
  return (
    <dialog open={openDialog} style={boxStyles}>
      <Box>
        <Typography variant="h3">Remember</Typography>
        <Typography variant="h3">This is a DEMO app!</Typography>
        <Typography variant="h3" paddingBottom={4}>DO NOT USE YOUR REAL BANKCARD!</Typography>
        <Button size="large" variant="contained" fullWidth onClick={() => setOpenDialog(false)}>I understand</Button>
      </Box>
  </dialog>
  )
}
