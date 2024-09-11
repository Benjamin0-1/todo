import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5155/api/task");
                setTasks(response.data);
            } catch (error) {
                console.log("Error fetching tasks:", error);
                toast.error("Error fetching tasks. Please try again.");
            }
        }
        fetchTasks();
    }, []);

    // DELETE
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5155/api/task/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
            toast.success("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Error deleting task. Please try again.");
        }
    };

    // PUT
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

    // Start editing
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
        <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tasks</h1>
            
            <h1>Total tasks: {tasks.length}</h1>

            {editing && (
                <form onSubmit={handleEdit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={taskToEdit.title}
                            onChange={(e) => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
                            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={taskToEdit.description}
                            onChange={(e) => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
                            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="isCompleted"
                            checked={taskToEdit.isCompleted}
                            onChange={(e) => setTaskToEdit({ ...taskToEdit, isCompleted: e.target.checked })}
                            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isCompleted" className="ml-2 text-lg font-medium text-gray-700">Completed</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    >
                        Update Task
                    </button>
                </form>
            )}

            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="bg-white p-6 rounded-lg shadow-md flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                            <p className="text-gray-600 mt-2">{task.description}</p>
                            <span className="text-sm text-gray-500 mt-2">Status: {task.isCompleted ? 'Completed' : 'Pending'}</span>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => startEdit(task)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 ease-in-out"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <ToastContainer />
        </div>
    );
}

export default Home;
