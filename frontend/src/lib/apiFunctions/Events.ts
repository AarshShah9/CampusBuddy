import { CBRequest } from "../CBRequest";

export async function getHomePageEvents() {
  return [];
}
export async function getSearchPageEvents() {
  let response = await CBRequest("GET", "/api/events/");
  return response.data;
}
export async function getProfilePageEvents() {
  return [];
}
