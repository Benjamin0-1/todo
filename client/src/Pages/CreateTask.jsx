import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // VERIFICAR.


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
        <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
            <h1 className="text-xl font-semibold mb-4">Create Task</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}

export default CreateTask;
