import api from "./api";

export const signup = (data) => {
    return api.post("/auth/Signup", data);
};

export const signin = (data) => {
    return api.post("/auth/Signin", data);
};

export const refreshToken = () => {
    return api.post("/auth/refresh");
};

export const getProfile = (token) => {
    return api.get("/user/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const createProfile = (token, data) => {
    return api.post("/user/profile", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};