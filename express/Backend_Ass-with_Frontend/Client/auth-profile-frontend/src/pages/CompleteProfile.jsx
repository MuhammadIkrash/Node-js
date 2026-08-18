import { useState } from "react";

import {
    useNavigate
} from "react-router-dom";

import AppShell from "../components/AppShell";
import { createProfile } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const CompleteProfile = () => {

    const {
        accessToken
    } = useAuth();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        phone: "",
        bio: "",
        address: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            await createProfile(
                accessToken,
                form
            );

            navigate("/profile", {
                replace: true
            });

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Profile creation failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <AppShell>

            <div className="page-header">

                <div>

                    <span className="eyebrow">
                        Profile Setup
                    </span>

                    <h1>
                        Complete your profile
                    </h1>

                    <p>
                        Add your personal information.
                    </p>

                </div>

            </div>

            <div className="panel form-panel">

                <form
                    className="form"
                    onSubmit={handleSubmit}
                >

                    {error && (
                        <div className="alert error">
                            {error}
                        </div>
                    )}

                    <label>
                        Phone

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="03001234567"
                        />
                    </label>

                    <label>
                        Bio

                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows="5"
                        />
                    </label>

                    <label>
                        Address

                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Karachi, Pakistan"
                            rows="3"
                        />
                    </label>

                    <button
                        className="btn primary"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Save Profile"}
                    </button>

                </form>

            </div>

        </AppShell>
    );
};

export default CompleteProfile;