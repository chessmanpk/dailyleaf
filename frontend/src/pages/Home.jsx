import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home () {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetchEntries();
    }, [navigate]);

    const [content, setContent] = useState ("");
    const [entries, setEntries] = useState ([]);
    const [loading, setLoading] = useState (false);

    const user = localStorage.getItem("user");

    const handleCreate = async () => {
        if (!content.trim()) {
            return alert("Entry cannot be empty");
        }

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/api/entries/create", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({ content }),
        });

        if (!res.ok) {
            throw new Error("Failed to create entry");
        }

        setContent("");

        await fetchEntries();
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchEntries = async () => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/entries/all",
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch entries");
            }

            const data = await res.json();

            setEntries(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        await fetch (`http://localhost:5000/api/entries/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

        fetchEntries();
    };

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleUpdate = async (id) => {
        await fetch(`http://localhost:5000/api/entries/update/${id}`, {
            method: "PUT",
            headers: {
                Authorization: localStorage.getItem("token"),
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

            <button 
            onClick={handleCreate}
            disabled={loading}
            >
                {loading ? "Saving..." : "Save"}
            </button>

            <div>
                {entries.length === 0 ? (
                    <p>No entries yet. Start writing 🌿</p>
                    ) : (
                    entries.map((entry) => (
                        <div key={entry._id} className="entry-card">
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

                            <small className="entry-user">
                                {entry.user}
                            </small>

                            <div>
                                <button
                                onClick={() => {
                                    setEditingId(entry._id);
                                    setEditText(entry.content);
                                }}
                                >
                                Edit
                                </button>

                                <button
                                onClick={() => handleDelete(entry._id)}
                                >
                                Delete
                                </button>
                            </div>
                            </>
                        )}
                        </div>
                    ))
                    )}
            </div>

        </div>
    );
}

export default Home;