export type EventType = {
  id: string;
  title: string;
  date: string;
  location: string;
  clubName?: string;
  image: string;
};

export type EventDetailsProps = {
  createdAt: string;
  description: string;
  endTime: string;
  id: string;
  image: string;
  isPublic: boolean;
  locationPlaceId: string;
  organizationId: string;
  startTime: string;
  status: string;
  title: string;
  userId: string;
  isLiked: boolean;
  eventResponses: any[];
  location: {
    latitude: number;
    longitude: number;
    name: string;
    placeId: string;
  };
  organization?: {
    createdAt: string;
    description: string;
    id: string;
    image: string;
    institutionId: string;
    organizationName: string;
    status: string;
    updatedAt: string;
  };
};

export type SearchPageEventType = {
  createdAt: string;
  description: string;
  endTime: string;
  id: string;
  image: string;
  isPublic: boolean;
  locationPlaceId: string;
  organizationId: string;
  organization?: {
    createdAt: string;
    description: string;
    id: string;
    image: string;
    institutionId: string;
    organizationName: string;
    status: string;
    updatedAt: string;
  };
  startTime: string;
  status: string;
  title: string;
  userId: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
    placeId: string;
  };
};

export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  clubName: string;
  picture: string;
};

export type EventData = {
  title: string;
  id: string;
  items: EventItem[];
};

export type EventItem = {
  id: string;
  title: string;
  time?: string;
  location?: string;
  host?: string;
  image: string;
  event: boolean;
};

export type EventMapItem = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
};

export type EventDetailsItem = {
  id: string;
  title: string;
  description: string;
  host: string;
  location: string;
  time: string;
  image: string;
  latitude: number;
  longitude: number;
};

export type lookingForDetail = {
  title: string;
  description: string;
  numberOfSpots: number;
  expiresAt: Date;
};

export type CarousalItem = {
  id: string;
  title: string;
  image: string;
};

export type AttendeeResponse = {
  id: string;
  name: string;
  image: string;
};

export type MarketPlaceItem = {
  title: string;
  price: string;
  condition: string;
  description: string;
  // tags?: string[];
  // location?: string;
};
