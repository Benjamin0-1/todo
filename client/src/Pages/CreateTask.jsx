import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
} from "@mui/material";

function CreateTask() {
    const [task, setTask] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5155/api/task', task);
            toast.success("Task created successfully!");
            setTask({
                title: "",
                description: "",
            });
        } catch (error) {
            toast.error("Error creating task. Please try again.");
            console.error("Error creating task:", error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Paper sx={{ p: 4, width: '100%', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Create Task
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <Box mb={3}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            value={task.title}
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Enter task title"
                            required
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            value={task.description}
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Enter task description"
                            multiline
                            rows={6}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Create Task
                    </Button>
                </form>
                <ToastContainer autoClose={1500}/>
            </Paper>
        </Container>
    );
}

export default CreateTask;
