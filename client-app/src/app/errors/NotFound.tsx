import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 400 }}>
          <Typography gutterBottom variant="h3" color="error" textAlign="center">We could not find what you were looking for 🧐 ... </Typography>
          <Divider />
          <Button fullWidth component={Link} to='/catalog'>Go back to catalog</Button>
        </Container>
    )
}

export { NotFound }