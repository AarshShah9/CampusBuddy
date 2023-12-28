//import axios from 'axios'

const mockDatabaseData = {
    Users: [
        {
            id: '1',
            name: 'Jarvis',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/jarvis.webp`
        },
        {
            id: '2',
            name: 'Tony Stark',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/tonystark.jpg`
        },
        {
            id: '3',
            name: 'Doctor Strange',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/doctorstrange.webp`
        },
        {
            id: '4',
            name: 'Hulk',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/hulk.webp`
        },
        {
            id: '5',
            name: 'Reed Richards',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/reedrichards.webp`
        },
        {
            id: '6',
            name: 'Black Widow',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/blackwidow.jpg`
        },
        {
            id: '7',
            name: 'Doctor Fate',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/doctorfate.jpg`
        },
        {
            id: '8',
            name: 'Moon Knight',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/moonknight.webp`
        },
        {
            id: '9',
            name: 'Spider man',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/spiderman.jpg`
        },
        {
            id: '10',
            name: 'Morbius',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/morbius.avif`
        },
        {
            id: '11',
            name: 'Thanos',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/thanos.jpg`
        },
        {
            id: '12',
            name: 'Captain America',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/capamerica.jpg`
        },
        {
            id: '13',
            name: 'Flowers lady',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/daisies.webp`
        },
        {
            id: '14',
            name: 'The Flash',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/theflash.webp`
        },
        {
            id: '15',
            name: 'Jason Bourne',
            icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/jasonbourne.jpg`
        },
    ]
}

export const getUserDataApi = async (id: string) => {
    //let res = await axios.get('') fetch user data end point as UserDataType
    return mockDatabaseData.Users.find(user => user.id === id)
}