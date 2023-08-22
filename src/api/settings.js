import { clientGet, clientPost } from "./client";

// listRegions returns a list of regions.
async function listRegions() {
    return await clientGet("/v1/settings/regions");
}

// listRegionTokens returns a list of region tokens.
async function listRegionTokens() {
    return await clientGet("/v1/settings/region_tokens")
}

// createRegionToken creates a region token.
async function createRegionToken(req) {
    return await clientPost("/v1/settings/region_tokens", req)
}

// listDomainSettings returns domain settings.
async function listDomainSettings() {
    return await clientGet("/v1/settings/domains")
}

// updateDomainSettings updates domain setting.
async function updateDomainSettings({ domain, protocol }) {
    return await clientPost("/v1/settings/domains", { domain, protocol })
}

// listStorageSettings returns storage settings.
async function listStorageSettings() {
    return await clientGet("/v1/settings/storage")
}

// updateStorageSettings updates storage setting.
async function updateStorageSettings({ typename, storage }) {
    return await clientPost("/v1/settings/storage?typename=" + typename, storage)
}

// getStats returns stats.
async function getStats() {
    return clientGet("/v1/settings/stats")
}

// getEmailSettings returns email settings.
async function getEmailSettings() {
    return clientGet("/v1/settings/email")
}

// updateEmailSettings updates email settings.
async function updateEmailSettings(data) {
    return clientPost("/v1/settings/email", data)
}

async function updatePassword(data) {
    return await clientPost("/v1/update-password", data);
}


export { createRegionToken, getEmailSettings, getStats, listDomainSettings, listRegionTokens, listRegions, listStorageSettings, updateDomainSettings, updateEmailSettings, updateStorageSettings, updatePassword };

