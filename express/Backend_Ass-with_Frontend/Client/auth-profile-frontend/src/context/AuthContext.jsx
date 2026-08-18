import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../api/api";
import {
    signin,
    refreshToken
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (data) => {
        const response = await signin(data);

        const token = response.data?.data?.accessToken;

        if (!token) {
            throw new Error("Access token not received");
        }

        setAccessToken(token);
        setUser(response.data?.data?.user);

        return response.data;
    };

    const refreshAccessToken = async () => {
        const response = await refreshToken();

        const newToken =
            response.data?.data?.accessToken;

        if (!newToken) {
            throw new Error("New access token not received");
        }

        setAccessToken(newToken);

        return newToken;
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null);
    };

    useEffect(() => {

        const checkSession = async () => {
            try {
                await refreshAccessToken();
            } catch {
                setAccessToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

    }, []);

    useEffect(() => {

        const requestInterceptor =
            api.interceptors.request.use((config) => {

                if (
                    accessToken &&
                    !config.url?.includes("/auth/refresh")
                ) {
                    config.headers.Authorization =
                        `Bearer ${accessToken}`;
                }

                return config;
            });

        return () => {
            api.interceptors.request.eject(
                requestInterceptor
            );
        };

    }, [accessToken]);

    useEffect(() => {

        const responseInterceptor =
            api.interceptors.response.use(

                (response) => response,

                async (error) => {

                    const originalRequest =
                        error.config;

                    if (
                        (error.response?.status === 401 ||
                            error.response?.status === 403) &&
                        !originalRequest?._retry &&
                        !originalRequest?.url?.includes("/auth/refresh")
                    ) {

                        originalRequest._retry = true;

                        try {

                            const newToken =
                                await refreshAccessToken();

                            originalRequest.headers.Authorization =
                                `Bearer ${newToken}`;

                            return api(originalRequest);

                        } catch {

                            logout();
                        }
                    }

                    return Promise.reject(error);
                }
            );

        return () => {
            api.interceptors.response.eject(
                responseInterceptor
            );
        };

    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                setUser,
                login,
                logout,
                refreshAccessToken,
                isAuthenticated: Boolean(accessToken),
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};