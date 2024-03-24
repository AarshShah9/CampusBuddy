type UserProfileRoute = {
    page: 'UserProfile',
    id: string
}

type ChatScreenRoute = {
    page: 'ChatScreen'
    userId: string,
    userName: string,
    icon: string
}

type EventDetailsRoute = {
    page: 'EventDetails'
    id: string,
    map?: boolean
}

type MessagesRoute = {
    page: 'Messages'
}

type HomeRoute = {
    page: 'Home'
}

type LoginRoute = {
    page: 'Login'
}

type MapDetailsRoute = {
    page: 'MapDetails',
    eventData: {
        title: string,
        description: string,
        latitude: number,
        longitude: number
    }[]
}

type AttendeesRoute = {
    page: 'Attendees',
    id: string
}

type StudentSignUpRoute = {
    page: 'StudentSignUp',
}

type OrgSignUpRoute = {
    page: 'OrgSignUp',
}

export type NavigationFunctionArgs = (
    UserProfileRoute | ChatScreenRoute | EventDetailsRoute | MessagesRoute | 
    HomeRoute | LoginRoute | MapDetailsRoute | AttendeesRoute | StudentSignUpRoute |
    OrgSignUpRoute
)

export type NavigableStacks = 'AuthenticationGroup' | 'LandingGroup' | 'ConfirmEmail' | 'OrgCreationConfirmation'