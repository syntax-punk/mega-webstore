import { Container, Divider, Paper, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

function ServerError() {
    const { state } = useLocation();

    return (
        <Container component={Paper}>
          { state?.error ? (
            <>
              <Typography gutterBottom variant="h3" color="error" textAlign="center">
                { state.error.title }
              </Typography>
              <Divider />
              <Typography variant="body1">
                { state.error.detail || 'Inernal server error!' }
              </Typography>
            </>
          ) :  
            <Typography gutterBottom variant="h5" color="error" textAlign="center">Server Error Occured</Typography>
          }
        </Container>
    )
}

export { ServerError }