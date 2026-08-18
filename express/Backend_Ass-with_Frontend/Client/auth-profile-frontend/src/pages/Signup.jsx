import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import { signup } from "../api/authApi";

const Signup = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
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

            await signup(form);

            navigate("/login");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Signup failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Create your secure account"
        >

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
                    Username

                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="your_username"
                    />
                </label>

                <label>
                    Email

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                    />
                </label>

                <label>
                    Password

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Strong password"
                    />
                </label>

                <button
                    className="btn primary full"
                    disabled={loading}
                >
                    {loading
                        ? "Creating..."
                        : "Create Account"}
                </button>

            </form>

            <p className="auth-footer">
                Already have an account?

                <Link to="/login">
                    Sign In
                </Link>
            </p>

        </AuthLayout>
    );
};

export default Signup;