import { Box, Typography, Button } from '@mui/material'
import { useState } from 'react'

export default function DemoAppWarning() {
  const [openDialog, setOpenDialog] = useState(true);
  
  return (
    <dialog open={openDialog} style={{ position: "fixed", top: "25%", border: "8px solid red" }}>
      <Box>
        <Typography variant="h3">Remember</Typography>
        <Typography variant="h3">This is a DEMO app!</Typography>
        <Typography variant="h3" paddingBottom={2}>DO NOT USE YOUR REAL BANKCARD!</Typography>
        <Button size="large" variant="contained" onClick={() => setOpenDialog(false)}>I understand</Button>
      </Box>
  </dialog>
  )
}
