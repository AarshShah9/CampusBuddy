//import axios from 'axios'

import { CBRequest } from "../CBRequest";

const mockDatabaseData = {
  Users: [
    {
      id: "db3679a1-c550-11ee-83fd-6f8d6c450910",
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
      id: "bae20bd0-5f15-4ca6-ac62-42c3c2a61da2\n",
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

export async function getUserDataApi(id: string) {
  const { body } = await CBRequest("GET", "/api/user/getUserNameById/:id", {
    params: { id },
  });
  return { name: body.name, icon: body.picture };
}
