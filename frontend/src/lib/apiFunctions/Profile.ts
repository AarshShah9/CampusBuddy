import { CBRequest } from "~/lib/CBRequest";
import { EventData, EventType } from "~/types/Events";

export const getProfileSaved = async () => {
  try {
    return (await CBRequest("GET", "/api/profile/saved")).data as EventData[];
  } catch (err) {
    console.log(err);
  }
};
