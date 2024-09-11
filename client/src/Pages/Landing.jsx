import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

function Landing () {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Task Tracker
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Manage your tasks efficiently and stay organized.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ fontSize: '1.2rem' }}
          onClick={() => window.location.href = '/home'}
        >
          Get Started
        </Button>
      </motion.div>
      
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          sx={{
            p: 2,
            m: 1,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            width: '300px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Fast and Efficient
          </Typography>
          <Typography>
            No longer forget what tasks you had to do in your everyday life.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          sx={{
            p: 2,
            m: 1,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            width: '300px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Free to Use
          </Typography>
          <Typography>
            Join the millions of users who have already started using Task Tracker.
          </Typography>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Landing;
