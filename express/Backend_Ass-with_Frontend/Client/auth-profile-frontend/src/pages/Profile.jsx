import {
    useEffect,
    useState
} from "react";

import AppShell from "../components/AppShell";
import { getProfile } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Profile = () => {

    const {
        accessToken
    } = useAuth();

    const [profile, setProfile] =
        useState(null);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const response =
                    await getProfile(accessToken);

                setProfile(
                    response.data?.data
                );

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Unable to load profile"
                );

            }

        };

        loadProfile();

    }, [accessToken]);

    return (
        <AppShell>

            <div className="page-header">

                <div>

                    <span className="eyebrow">
                        Account
                    </span>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        Your Authentication and
                        UserInfo data are connected.
                    </p>

                </div>

            </div>

            {error && (
                <div className="alert error">
                    {error}
                </div>
            )}

            {profile && (

                <div className="profile-grid">

                    <div className="panel profile-user">

                        <div className="avatar large">
                            {profile.accountRef?.username
                                ?.charAt(0)
                                ?.toUpperCase()}
                        </div>

                        <h2>
                            {profile.accountRef?.username}
                        </h2>

                        <p>
                            {profile.accountRef?.email}
                        </p>

                    </div>

                    <div className="panel">

                        <div className="profile-row">
                            <span>Phone</span>
                            <strong>
                                {profile.phone}
                            </strong>
                        </div>

                        <div className="profile-row">
                            <span>Bio</span>
                            <strong>
                                {profile.bio}
                            </strong>
                        </div>

                        <div className="profile-row">
                            <span>Address</span>
                            <strong>
                                {profile.address}
                            </strong>
                        </div>

                    </div>

                </div>

            )}

        </AppShell>
    );
};

export default Profile;