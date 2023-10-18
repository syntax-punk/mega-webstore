import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { agent } from "../../app/api/agent";

function AboutPage() {

  const catchToLog = (error: object) => console.log(error);

  return (
    <Container>
      <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" color="primary" onClick={() => {
          return agent.TestErrors.get400().catch(catchToLog);
        }}>
          Test 400 Error
        </Button> 
        <Button variant="contained" color="primary" onClick={() => {
          return agent.TestErrors.get401().catch(catchToLog);
        }}>
          Test 401 Error
        </Button> 
        <Button variant="contained" color="primary" onClick={() => {
          return agent.TestErrors.get404().catch(catchToLog);
        }}>
          Test 404 Error
        </Button> 
        <Button variant="contained" color="primary" onClick={() => {
          return agent.TestErrors.get500().catch(catchToLog);
        }}>
          Test 500 Error
        </Button> 
        <Button variant="contained" color="primary" onClick={() => {
          return agent.TestErrors.getValidationError().catch(catchToLog);
        }}>
          Test Validation Error
        </Button> 
      </ButtonGroup>
    </Container>
  );
}

export { AboutPage }