import Jobs from "./Jobs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function JobsAuth() {
  return (
    <div>
      <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Jobs at Shwifty Automotive
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Join our team of skilled professionals and help us revolutionize
          vehicle repair!
        </Typography>
      </Box>
      <Authenticator>
        <Jobs />
      </Authenticator>
    </div>
  );
}

export default JobsAuth;