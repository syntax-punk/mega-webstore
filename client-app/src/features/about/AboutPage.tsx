import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { agent } from "../../app/api/agent";
import { useState } from "react";

function AboutPage() {

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const catchToLog = (error: object) => console.log(error);

  const getValidationErrors = () => agent.TestErrors.getValidationError()
    .catch((errors: string[]) => setValidationErrors(errors))

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
        <Button variant="contained" color="primary" onClick={getValidationErrors}>
          Test Validation Error
        </Button> 
      </ButtonGroup>
      {validationErrors.length > 0 && 
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            { validationErrors.map((error, i) => 
              <ListItem key={i}>{error}</ListItem>
            )}
          </List>
        </Alert>
      }
    </Container>
  );
}

export { AboutPage }