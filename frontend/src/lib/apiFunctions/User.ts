//import axios from 'axios'

const mockDatabaseData = {
    Users: [
      {
        id: "1",
        name: "Jarvis",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/jarvis.webp`,
      },
      {
        id: "2",
        name: "Tony Stark",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/tonystark.jpg`,
      },
      {
        id: "3",
        name: "Doctor Strange",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/doctorstrange.webp`,
      },
      {
        id: "4",
        name: "Hulk",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/hulk.webp`,
      },
      {
        id: "5",
        name: "Reed Richards",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/reedrichards.webp`,
      },
      {
        id: "6",
        name: "Black Widow",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/blackwidow.jpg`,
      },
      {
        id: "7",
        name: "Doctor Fate",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/doctorfate.jpg`,
      },
      {
        id: "8",
        name: "Moon Knight",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/moonknight.webp`,
      },
      {
        id: "9",
        name: "Spider man",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/spiderman.jpg`,
      },
      {
        id: "10",
        name: "Morbius",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/morbius.avif`,
      },
      {
        id: "11",
        name: "Thanos",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/thanos.jpg`,
      },
      {
        id: "12",
        name: "Captain America",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/capamerica.jpg`,
      },
      {
        id: "13",
        name: "Flowers lady",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/daisies.webp`,
      },
      {
        id: "14",
        name: "The Flash",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/theflash.webp`,
      },
      {
        id: "15",
        name: "Jason Bourne",
        icon: `https://d2epenzoyf672m.cloudfront.net/pfp/jasonbourne.jpg`,
      },
    ],
  };
    
export const getUserDataApi = async (id: string) => {
    //let res = await axios.get('') fetch user data end point as UserDataType
    return mockDatabaseData.Users.find((user) => user.id === id);
  };