import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home () {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);

    const [content, setContent] = useState ("");
    const [entries, setEntries] = useState ([]);

    const user = localStorage.getItem("user");

    const handleCreate = async () => {
        await fetch("http://localhost:5000/api/entries/create", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content, user })
        });

        setContent("");
        fetchEntries();
    };

    const fetchEntries = async () => {
        const res = await fetch("http://localhost:5000/api/entries/all");
        const data = await res.json();
        setEntries(data);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        // <div className="home">
        //     <h2>Welcome to Dailyleaf 🌿</h2>
        //     <p>Track your habits.📊 Stay consistent.📝 Grow daily.📈 </p>
        // </div>

        <div>
            <h2>Welcome {user}</h2>

            <textarea
            placeholder= "Write your thoughts...."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={handleCreate}>Save</button>

            <div>
                {entries.map((entry, index) => (
                    <div key={index}>
                        <p>{entry.content}</p>
                        <small>{entry.user}</small>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Home;