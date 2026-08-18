import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import {
    useAuth
} from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CompleteProfile from "./pages/CompleteProfile";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {

    const {
        loading,
        isAuthenticated
    } = useAuth();

    if (loading) {
        return (
            <div className="center">
                Loading...
            </div>
        );
    }

    return (
        <Routes>

            <Route
                path="/"
                element={
                    <Navigate
                        to={
                            isAuthenticated
                                ? "/dashboard"
                                : "/login"
                        }
                        replace
                    />
                }
            />

            <Route element={<PublicRoute />}>

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

            </Route>

            <Route element={<ProtectedRoute />}>

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/complete-profile"
                    element={<CompleteProfile />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
};

export default App;