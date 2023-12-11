//import axios from 'axios'

const mockDatabaseData = {
    Users: [
        {
            id: '2',
            name: 'Tony Stark', 
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/tonystark.jpg`
        },
        {
            id: '3',
            name: 'Jarvis', 
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/jarvis.webp`
        },
        {
            id: '4',
            name: 'Steve Rogers', 
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/capamerica.jpg`
        }
    ]
}

export const getUserDataApi = async (id: string) => {
    //let res = await axios.get('') fetch user data end point as UserDataType
    return mockDatabaseData.Users.find(user => user.id === id)
}