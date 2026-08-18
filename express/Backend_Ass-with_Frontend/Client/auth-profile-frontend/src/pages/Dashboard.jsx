import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import AppShell from "../components/AppShell";
import { getProfile } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const {
        user,
        accessToken
    } = useAuth();

    const navigate = useNavigate();

    const [profileStatus, setProfileStatus] =
        useState("checking");

    useEffect(() => {

        const checkProfile = async () => {

            try {

                await getProfile(accessToken);

                setProfileStatus("complete");

            } catch (error) {

                if (error.response?.status === 404) {
                    setProfileStatus("incomplete");
                } else {
                    setProfileStatus("error");
                }

            }

        };

        checkProfile();

    }, [accessToken]);

    return (
        <AppShell>

            <div className="page-header">

                <div>

                    <span className="eyebrow">
                        Dashboard
                    </span>

                    <h1>
                        Welcome, {user?.username}
                    </h1>

                    <p>
                        Your account is authenticated.
                    </p>

                </div>

                {profileStatus === "incomplete" && (

                    <button
                        className="btn primary"
                        onClick={() =>
                            navigate("/complete-profile")
                        }
                    >
                        Complete Profile
                    </button>

                )}

            </div>

            <div className="dashboard-grid">

                <div className="stat-card">
                    <span>Account</span>
                    <strong>Active</strong>
                    <small>{user?.email}</small>
                </div>

                <div className="stat-card">
                    <span>Access Token</span>
                    <strong>1 Minute</strong>
                    <small>Auto refresh enabled</small>
                </div>

                <div className="stat-card">
                    <span>Profile</span>

                    <strong>
                        {profileStatus === "complete"
                            ? "Complete"
                            : profileStatus === "incomplete"
                            ? "Incomplete"
                            : "Checking"}
                    </strong>

                    <small>
                        UserInfo collection
                    </small>
                </div>

            </div>

        </AppShell>
    );
};

export default Dashboard;