import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home () {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const [content, setContent] = useState ("");
    const [entries, setEntries] = useState ([]);

    const user = localStorage.getItem("user");

    const handleCreate = async () => {
        await fetch("http://localhost:5000/api/entries/create", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
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

    const handleDelete = async (id) => {
        await fetch (`http://localhost:5000/api/entries/delete/${id}`, {
            method: "DELETE",
        });

        fetchEntries();
    };

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleUpdate = async (id) => {
        await fetch(`http://localhost:5000/api/entries/update/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            content: editText
            })
        });

        setEditingId(null);
        fetchEntries();
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        // <div className="home">
        //     <h2>Welcome to Dailyleaf 🌿</h2>
        //     <p>Track your habits.📊 Stay consistent.📝 Grow daily.📈 </p>
        // </div>

        <div className="container">
            <h2>Welcome {user}</h2>

            <textarea
            placeholder= "Write your thoughts...."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={handleCreate}>Save</button>

            <div>
                {entries.map((entry) => (
                <div
                    key={entry._id}
                    className="entry-card"
                    style={{
                    border: "1px solid gray",
                    padding: "10px",
                    marginTop: "10px"
                    }}
                >
                    {editingId === entry._id ? (
                    <>
                        <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        />

                        <button onClick={() => handleUpdate(entry._id)}>
                        Save
                        </button>
                    </>
                    ) : (
                    <>
                        <p>{entry.content}</p>
                        <small className="entry-user">{entry.user}</small>

                        <div>
                        <button
                            onClick={() => {
                            setEditingId(entry._id);
                            setEditText(entry.content);
                            }}
                        >
                            Edit
                        </button>

                        <button onClick={() => handleDelete(entry._id)}>
                            Delete
                        </button>
                        </div>
                    </>
                    )}
                </div>
                ))}
            </div>

        </div>
    );
}

export default Home;