// Topbar.jsx
import { Chat, Notifications, Search } from "@mui/icons-material";
import "./Topbar.css";
import { Link } from "react-router-dom";

const Topbar = () => {
    return (
        <div className="topbarContainer">
            <div className="topbarTitle">
                <Link to='/' style={{ textDecoration: "none" }}>
                    <span className="logo">Technical Summary</span>
                </Link>
            </div>
            <div className="topbarLeft"></div>
            <div className="topbarCenter"></div>
            <div className="topbarRight"></div>
        </div>
    );
};

export default Topbar;
