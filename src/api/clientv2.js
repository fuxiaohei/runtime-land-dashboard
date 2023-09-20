import { clientDelete, clientGet, clientPost, clientPut } from "./client";

const projectAPI = {
    list: async function () {
        return await clientGet("/v2/projects");
    },
    create: async function (req) {
        return await clientPost("/v2/project", req);
    },
    overview: async function (name) {
        return await clientGet("/v2/project/" + name + "/overview");
    },
    rename: async function (old_name, new_name) {
        return await clientPost("/v2/project/rename", {
            "old_name": old_name,
            "new_name": new_name,
        });
    },
}

const templateAPI = {
    list: async function () {
        return await clientGet("/v2/templates");
    },
}

const tokensAPI = {
    list: async function () {
        return await clientGet("/v2/tokens");
    },
    create: async function (name) {
        return await clientPost("/v2/token", { name: name });
    },
    delete: async function (uuid) {
        console.log("delete token", uuid);
        return await clientDelete("/v2/token?uuid=" + encodeURIComponent(uuid));
    }
}

const deploymentAPI = {
    publish: async function (uuid) {
        return await clientPut("/v2/deployment", {
            project_uuid: "",
            deployment_uuid: uuid,
            action: "publish",
        });
    },
    enable: async function (uuid) {
        return await clientPut("/v2/deployment", {
            project_uuid: "",
            deployment_uuid: uuid,
            action: "enable",
        });
    },
    disable: async function (uuid) {
        return await clientPut("/v2/deployment", {
            project_uuid: "",
            deployment_uuid: uuid,
            action: "disable",
        });
    },
}

const authAPI = {
    verify: async function (token) {
        return await clientPost("/v2/auth/verify", { token: token });
    },
    create: async function (req) {
        return await clientPost("/v2/auth/create", req);
    },
}

const clientv2 = {
    project: projectAPI,
    template: templateAPI,
    deployment: deploymentAPI,
    auth: authAPI,
    token: tokensAPI,
}

export { clientv2 };
