import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    Container,
    Typography,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Card,
    CardContent,
    CardActions,
    Grid,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState({
        id: null,
        title: "",
        description: "",
        isCompleted: false
    });
    const [editing, setEditing] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5155/api/task");
                setTasks(response.data);
            } catch (error) {
                console.log("Error fetching tasks:", error);
                toast.error("Error fetching tasks. Please try again.");
            }
        };
        fetchTasks();
    }, []);

    const handleDelete = async () => {
        try {
            if (taskToDelete !== null) {
                await axios.delete(`http://localhost:5155/api/task/${taskToDelete}`);
                setTasks(tasks.filter((task) => task.id !== taskToDelete));
                toast.success("Task deleted successfully!");
            }
            setOpenConfirmDialog(false);
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Error deleting task. Please try again.");
            setOpenConfirmDialog(false);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5155/api/task/${taskToEdit.id}`, taskToEdit);
            setTasks(tasks.map((task) =>
                task.id === taskToEdit.id ? { ...taskToEdit } : task
            ));
            toast.success("Task updated successfully!");
            setEditing(false);
            setTaskToEdit({
                id: null,
                title: "",
                description: "",
                isCompleted: false
            });
        } catch (error) {
            console.error("Error editing task:", error);
            toast.error("Error editing task. Please try again.");
        }
    };

    const startEdit = (task) => {
        setTaskToEdit({
            id: task.id,
            title: task.title,
            description: task.description,
            isCompleted: task.isCompleted
        });
        setEditing(true);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Tasks
            </Typography>

            {tasks.length > 0 ? (
                <Typography variant="h6" gutterBottom>
                    Total tasks: {tasks.length}
                </Typography>
            ) : (
                <Typography variant="h6" gutterBottom>
                    No tasks found
                </Typography>
            )}

            {/* Edit Task Dialog */}
            <Dialog open={editing} onClose={() => setEditing(false)}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleEdit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="title"
                            name="title"
                            label="Title"
                            value={taskToEdit.title}
                            onChange={(e) => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="description"
                            name="description"
                            label="Description"
                            value={taskToEdit.description}
                            onChange={(e) => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
                            variant="outlined"
                            multiline
                            rows={4}
                            required
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="isCompleted"
                                    checked={taskToEdit.isCompleted}
                                    onChange={(e) => setTaskToEdit({ ...taskToEdit, isCompleted: e.target.checked })}
                                />
                            }
                            label="Completed"
                        />
                        <DialogActions>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Update Task
                            </Button>
                            <Button onClick={() => setEditing(false)} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Confirm Delete Dialog */}
            <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this task?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={3}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{task.title}</Typography>
                                <Typography color="textSecondary">{task.description}</Typography>
                                <Typography color="textSecondary">Status: {task.isCompleted ? 'Completed' : 'Pending'}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="warning"
                                    onClick={() => startEdit(task)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => {
                                        setTaskToDelete(task.id);
                                        setOpenConfirmDialog(true);
                                    }}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <ToastContainer autoClose={1500} />
        </Container>
    );
}

export default Home;
