// src/App.tsx
// import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import JobsAuth from './components/JobsAuth';
import JobApplicationWithAuth from './components/JobApplication';
import ApplicationsWithAuth from './components/Applications';
import Home from './components/Home';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabPaths = ['/', '/jobs'];
  const currentTabIndex = tabPaths.indexOf(location.pathname);

  // Access authentication state and functions
  const { user, signOut } = useAuthenticator();

  const handleAuthButtonClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/jobs');
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <img
              src="/loglogo.png"
              alt="Shwifty Automotive Logo"
              style={{
                height: '50px',
                objectFit: 'contain',
                backgroundColor: 'transparent',
                paddingRight: 10,
              }}
            />
            <Tabs
              value={currentTabIndex !== -1 ? currentTabIndex : false}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Home" component={Link} to="/" />
              <Tab label="Jobs" component={Link} to="/jobs" />
            </Tabs>
          </Box>
          <Button color="inherit" onClick={handleAuthButtonClick}>
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<JobApplicationWithAuth />} />
        <Route path="/applications" element={<ApplicationsWithAuth />} />
        <Route path="/jobs" element={<JobsAuth />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;