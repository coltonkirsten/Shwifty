// import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from '@aws-amplify/ui-react';

// const client = generateClient<Schema>();

// function App() {
//   const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
//   const { user, signOut } = useAuthenticator();

//   useEffect(() => {
//     client.models.Todo.observeQuery().subscribe({
//       next: (data) => setTodos([...data.items]),
//     });
//   }, []);

//   function createTodo() {
//     client.models.Todo.create({ content: window.prompt("Todo content") });
//   }
    
//   function deleteTodo(id: string) {
//     client.models.Todo.delete({ id })
//   }

//   return (
//     <main>
//             <h1>{user?.signInDetails?.loginId}'s todos</h1>
//       <button onClick={createTodo}>+ new</button>
//       <ul>
//         {todos.map((todo) => (
//           <li 
//          onClick={() => deleteTodo(todo.id)}

//           key={todo.id}>{todo.content}
//           </li>
//         ))}
//       </ul>
//       <div>
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
//           Review next step of this tutorial.
//         </a>
//       </div>
//       <button onClick={signOut}>Sign out</button>
//     </main>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import JobsAuth from "./components/JobsAuth";
import JobApplicationWithAuth from "./components/JobApplication";
import ApplicationsWithAuth from "./components/Applications";

function App() {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="div">
                Shwifty Automotive
              </Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor="secondary"
              >
                <Tab label="Home" component={Link} to="/" />
                <Tab label="Jobs" component={Link} to="/jobs" />
              </Tabs>
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route
            path="/"
            element={
              <Typography
                variant="h4"
                sx={{ textAlign: "center", mt: 4 }}
              >
                Welcome Home
              </Typography>
            }
          />
          <Route path="/apply" element={<JobApplicationWithAuth />} />
          <Route
            path="/applications"
            element={<ApplicationsWithAuth />}
          />
          <Route path="/jobs" element={<JobsAuth />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;