import axios from 'axios'

export const getUserDataApi = async (userId: string) => {
    //let res = await axios.get('') fetch user data end point as UserDataType
    return { 
        name: 'Tony Stark', 
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/tonystark.jpg`
    }
}