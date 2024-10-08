export type DuplicatedScreen =
  | "UserProfile"
  | "EventDetails"
  | "LookingForDetails"
  | "LookingForCommentsScreen"
  | "MarketPlaceDetail"
  | "Attendees"
  | "MapDetails"
  | "OrganizationProfile"
  | "EditEvent"
  | "QRCodeScanner"
  | "EventPricing"
  | "EventPayment";

export type CurrentMainTab =
  | "Home"
  | "Search"
  | "CreatePost"
  | "Maps"
  | "Profile";

type RouteNameProp = {
  routeName: string;
};

type UserProfileRoute = {
  page: "UserProfile";
  id: string;
};

type ChatScreenRoute = {
  page: "ChatScreen";
  userId: string;
  userName?: string;
  icon?: string | null | undefined;
};

type EventDetailsRoute = {
  page: "EventDetails";
  id: string;
  map?: boolean;
};

type MarketPlaceDetailsRoute = {
  page: "MarketPlaceDetail";
  id: string;
};

type LookingForDetailsRoute = {
  page: "LookingForDetails";
  id: string;
};

type MessagesRoute = {
  page: "Messages";
};

type HomeRoute = {
  page: "Home";
};

type LoginRoute = {
  page: "Login";
};

type MapDetailsRoute = {
  page: "MapDetails";
  eventData?: {
    title: string;
    description: string;
    latitude: number;
    longitude: number;
  }[];
  itemData?: {
    title: string;
    description: string;
    latitude: number;
    longitude: number;
  }[];
};

type AttendeesRoute = {
  page: "Attendees";
  id: string;
};

type OrganizationProfileRoute = {
  page: "OrganizationProfile";
  id: string;
};

type StudentSignUpRoute = {
  page: "StudentSignUp";
};

type OrgSignUpRoute = {
  page: "OrgSignUp";
};

type SettingsRoute = {
  page: "Settings";
};

type CommentsRoute = {
  page: "LookingForCommentsScreen";
  id: string;
};

type OrganizationSettingsRoute = {
  page: "OrganizationSettings";
};

type EditEventRoute = {
  page: "EditEvent";
};

type QRCodeScannerRoute = {
  page: "QRCodeScanner";
};

type HelpRoute = {
  page: "Help";
};

type InterestsRoute = {
  page: "Interests";
};

type PaymentRoute = {
  page: "EventPayment";
  eventId: string;
};

type PricingRoute = {
  page: "EventPricing";
  image: string;
  title: string;
  subtitle: string;
  price: number;
  eventId: string;
};

type AnalyticsRoute = {
  page: "Analytics";
};

export type NavigationFunctionArgs =
  | UserProfileRoute
  | ChatScreenRoute
  | EventDetailsRoute
  | MessagesRoute
  | HomeRoute
  | LoginRoute
  | MapDetailsRoute
  | AttendeesRoute
  | StudentSignUpRoute
  | OrgSignUpRoute
  | OrganizationProfileRoute
  | LookingForDetailsRoute
  | MarketPlaceDetailsRoute
  | CommentsRoute
  | OrganizationSettingsRoute
  | EditEventRoute
  | QRCodeScannerRoute
  | HelpRoute
  | InterestsRoute
  | PaymentRoute
  | AnalyticsRoute
  | PricingRoute
  | SettingsRoute;

export type NavigableStacks =
  | "AuthenticationGroup"
  | "LandingGroup"
  | "ConfirmEmail"
  | "OrgCreationConfirmation"
  | "Interests";
