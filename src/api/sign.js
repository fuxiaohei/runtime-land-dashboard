import { clientPost } from "./client";

async function signup(data) {
    return await clientPost("/v1/signup", data);
}

async function login_by_email(data) {
    return await clientPost("/v1/login", data);
}

async function forget_password(data) {
    data.base = window.location.origin;
    return await clientPost("/v1/forget-password", data);
}

async function reset_password(token) {
    return await clientPost("/v1/reset-password/" + encodeURIComponent(token));
}

export { forget_password, login_by_email, reset_password, signup };

