import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-lg">
                    Task Tracker
                </Link>
                <div>
                    <Link
                        to="/create-task"
                        className="text-white font-semibold px-4 py-2 rounded-md bg-blue-700"
                    >
                        Create Task
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;