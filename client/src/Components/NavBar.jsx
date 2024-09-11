import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

function NavBar() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                   
                    <Button
                        component={Link}
                        to="/create-task"
                        variant="contained"
                        color="secondary"
                        sx={{ textTransform: 'none' }}
                    >
                        Create Task
                    </Button>
                    <Button
                        component={Link}
                        to="/home"
                        variant="contained"
                        color="secondary"
                        sx={{ textTransform: 'none' }}
                    >
                        Home
                    </Button>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
