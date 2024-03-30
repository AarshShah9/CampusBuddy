export type MarketPlaceItem = {
  title: string;
  price: string;
  condition: string;
  description: string;
  locationPlaceId: string;
  // tags?: string[];
};

export type MarketPlaceCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
};

export type MarketPlaceItemResponse = {
  id: string;
  title: string;
  price: string;
  location: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  condition: string;
  description: string;
  sellerFullName: string;
  sellerId: string;
  images: string[];
};
