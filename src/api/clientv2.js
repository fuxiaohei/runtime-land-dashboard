import { clientGet, clientPost } from "./client";

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
}

const templateAPI = {
    list: async function () {
        return await clientGet("/v2/templates");
    },
}

const clientv2 = {
    project: projectAPI,
    template: templateAPI,
}

export { clientv2 };