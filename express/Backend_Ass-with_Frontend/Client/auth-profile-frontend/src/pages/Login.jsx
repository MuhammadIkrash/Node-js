import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const {
        login
    } = useAuth();

    const navigate = useNavigate();

    const [form, setForm] = useState({
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

            await login(form);

            navigate("/dashboard", {
                replace: true
            });

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Login to continue"
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
                        placeholder="Your password"
                    />
                </label>

                <button
                    className="btn primary full"
                    disabled={loading}
                >
                    {loading
                        ? "Signing In..."
                        : "Sign In"}
                </button>

            </form>

            <p className="auth-footer">
                Don't have an account?

                <Link to="/signup">
                    Create Account
                </Link>
            </p>

        </AuthLayout>
    );
};

export default Login;