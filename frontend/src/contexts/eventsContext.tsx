import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useCallback } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import { CBRequest } from "~/lib/CBRequest";
import {
    createEvent,
    getAllMapEvents,
    getEventDetails,
    getHomePageEvents,
    getMainEvents,
    getProfilePageEvents,
    getSearchPageEvents,
    likeEvent,
} from "~/lib/apiFunctions/Events";
import { EventType } from "~/types/Events";
import { createEventType } from "~/screens/CreateEvent";


type lookingForDetail = {
    title: string;
    description: string;
    numberOfSpots: number;
    expiresAt: Date;
};

type eventsContext = {
    getMainEvents: () => Promise<any>;
    createEvent: (
        event: createEventType,
        image: ImagePickerAsset,
    ) => Promise<any>;
    createPost: (post: lookingForDetail) => Promise<any>; // fix any on post type
    getAllMapEvents: () => Promise<any>;
    homePageEvents: EventType[];
    searchPageEvents: EventType[];
    profilePageEvents: EventType[];
    getEventDetails: (id: string) => Promise<any>;
    likeEvent: (id: string) => Promise<any>;
    getAllPosts: () => Promise<any>;

};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({
                                          children,
                                      }: PropsWithChildren): JSX.Element => {
    const { data: homePageEvents } = useQuery({
        queryKey: ["home-page-events"],
        queryFn: getHomePageEvents,
        initialData: [],
    });

    const { data: searchPageEvents } = useQuery({
        queryKey: ["search-page-events"],
        queryFn: getSearchPageEvents,
        initialData: [],
    });

    const { data: profilePageEvents } = useQuery({
        queryKey: ["profile-page-events"],
        queryFn: getProfilePageEvents,
        initialData: [],
    });

    const getAllPosts = useCallback(async () => {
        try {
            return await CBRequest("GET", "/api/post/");
        } catch (err) {
            console.log(err);
        }
    }, []);

    const createPost = useCallback(async (post: any) => {
        try {
            return await CBRequest("POST", "/api/post/", {
                body: post,
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <EventsContext.Provider
            value={{
                getMainEvents,
                createEvent,
                getAllMapEvents,
                searchPageEvents,
                homePageEvents,
                profilePageEvents,
                getEventDetails,
                likeEvent,
                createPost,
                getAllPosts
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContext;
