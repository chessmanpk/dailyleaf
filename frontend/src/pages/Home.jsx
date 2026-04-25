import { useEffect } from "react";
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

    return (
        <div className="home">
            <h2>Welcome to Dailyleaf 🌿</h2>
            <p>Track your habits.📊 Stay consistent.📝 Grow daily.📈 </p>
        </div>
    );
}

export default Home;