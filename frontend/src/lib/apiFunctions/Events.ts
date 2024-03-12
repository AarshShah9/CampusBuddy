import { mockSearchEvents } from "~/mockData/EventData";
import { CBRequest } from "../CBRequest";

export async function getHomePageEvents(){
    return [];
}
export async function getSearchPageEvents(){
    let response = await CBRequest("GET", "/api/events/")
    console.log("the resposne is: ", response.data.slice(0, 1)[0].title);
    return response.data;
}
export async function getProfilePageEvents(){
    return [];
}