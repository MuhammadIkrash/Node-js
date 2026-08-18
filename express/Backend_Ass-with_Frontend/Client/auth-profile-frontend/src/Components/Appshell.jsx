import {
    NavLink,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const AppShell = ({ children }) => {

    const {
        user,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login", {
            replace: true
        });
    };

    return (
        <div className="app-layout">

            <aside className="sidebar">

                <div className="logo sidebar-logo">

                    <div className="logo-icon">
                        A
                    </div>

                    <div>
                        <h2>AuthFlow</h2>
                        <span>React + JWT</span>
                    </div>

                </div>

                <nav className="navigation">

                    <NavLink to="/dashboard">
                        Dashboard
                    </NavLink>

                    <NavLink to="/profile">
                        Profile
                    </NavLink>

                    <NavLink to="/complete-profile">
                        Complete Profile
                    </NavLink>

                </nav>

                <div className="sidebar-bottom">

                    <div className="user-mini">

                        <div className="avatar">
                            {user?.username
                                ?.charAt(0)
                                ?.toUpperCase()}
                        </div>

                        <div>
                            <strong>
                                {user?.username}
                            </strong>

                            <span>
                                {user?.email}
                            </span>
                        </div>

                    </div>

                    <button
                        className="btn secondary full"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </aside>

            <main className="main">
                {children}
            </main>

        </div>
    );
};

export default AppShell;