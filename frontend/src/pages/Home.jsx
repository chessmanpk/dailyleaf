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
    const [tag, setTag] = useState("Personal");
    const [search, setSearch] = useState("");

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
            body: JSON.stringify({
                content,
                tag,
            }),
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


    const filteredEntries = entries.filter((entry) => 
        entry.content.toLowerCase().includes(search.toLowerCase()) || 

        entry.tag.toLowerCase().includes(search.toLowerCase())
    );

    

    return (
        // <div className="home">
        //     <h2>Welcome to Dailyleaf 🌿</h2>
        //     <p>Track your habits.📊 Stay consistent.📝 Grow daily.📈 </p>
        // </div>

        <div className="container">
            <h2>Welcome {user}</h2>

            <h2>Your Journal</h2>
            <p>Capture your thoughts privately.</p>

            <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            >
                <option>Personal</option>
                <option>Work</option>
                <option>Ideas</option>
                <option>Learning</option>
            </select>

            <textarea
                placeholder="Write your thoughts..."
                value={content}
                maxLength={500}
                onChange={(e) => setContent(e.target.value)}
                autoFocus
            />
            <p>
                {content.length}/500 characters
            </p>

            <button 
            onClick={handleCreate}
            disabled={loading}
            >
                {loading ? "Saving..." : "Save"}
            </button>

            <input
                className="search-input"
                type="text"
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div>
                {entries.length === 0 ? (
                    <div className="empty-state">
                        <h3>No entries yet 🌿</h3>
                        <p>
                            Start documenting your thoughts and ideas.
                        </p>
                    </div>
                    ) : (
                    filteredEntries.map((entry) => (
                        <div key={entry._id} className="entry-card">
                        {editingId === entry._id ? (
                            <>

                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                maxLength={500}
                            />
                            
                            <p>
                                {editText.length}/500 characters
                            </p>

                            <button onClick={() => handleUpdate(entry._id)}>
                                Save
                            </button>
                            </>
                        ) : (
                            <>
                            
                            <p>{entry.content}</p>
                            <p className="entry-tag">
                                #{entry.tag}
                            </p>

                            <div className="entry-meta">
                                <small className="entry-user">
                                {entry.user}
                                </small>

                                <small className="entry-date">
                                    {new Date(entry.createdAt).toLocaleString()}
                                </small>
                            </div>
                            

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