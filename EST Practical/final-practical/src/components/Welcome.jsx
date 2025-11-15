import { useState } from "react";

function Welcome({ name }) {
    const [inputName, setInputName] = useState(name ?? "");

    const handleInputChange = (e) => {
        setInputName(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <input 
                type="text" 
                placeholder="Enter your name" 
                value={inputName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 mb-4"
            />
            <h1 className="text-3xl font-semibold text-blue-500">
                Welcome {inputName || "Guest"}!
            </h1>
        </div>
    );
}

export default Welcome;