import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import githubLogo from '../../assets/github_logo.png'

export default function Header() {
  return (
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Box display="flex" justifyContent="center" width="100%">
          <Box
            component="img"
            src={githubLogo}
            alt="GitHub Logo"
            sx={{
              height: { xs: 50, sm: 55, md: 60 },
              width: 'auto',
              marginTop:'1rem'
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

