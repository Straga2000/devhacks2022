import {baseUrl, apiController} from "./common";

export const loginUser = (data) => {
    const LOGIN_USER_ENDPOINT = baseUrl('auth/login/');
    return apiController(LOGIN_USER_ENDPOINT, 'POST', data)
}


//
// export const getDiscordEvents = (initialFilter) => {
//     const GET_DEALS_ENDPOINT = baseUrl('discord/guild/events/');
//     return apiController(GET_DEALS_ENDPOINT, 'GET', initialFilter)
// };
//
// export const getDiscordUser = () => {
//     const GET_DISCORD_USER = baseUrl('discord/');
//     return apiController(GET_DISCORD_USER, 'GET')
// }
//
// export const removeDiscordUser = () => {
//     const REMOVE_DISCORD_USER = baseUrl('discord/removal')
//     return apiController(REMOVE_DISCORD_USER, 'GET')
// }
//
// export const getDiscordMessages = () => {
//     const GET_DISCORD_MESSAGES = baseUrl('discord/guild/messages/')
//     return apiController(GET_DISCORD_MESSAGES, 'GET')
// }
//
// export const getDiscordServer = () => {
//     const GET_DISCORD_SERVER = baseUrl('discord/guild/')
//     return apiController(GET_DISCORD_SERVER, 'GET')
// }
//
// export const getDiscordPresence = () => {
//     const GET_DISCORD_SERVER = baseUrl('discord/guild/presence/')
//     return apiController(GET_DISCORD_SERVER, 'GET')
// }