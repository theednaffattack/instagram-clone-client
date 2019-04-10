const museum_photo = "../../static/images/discover/cards/ny_art_museum.png";
const hotel_photo = "../../static/images/discover/cards/hotel_table.png";

export const cardInfo: {
  id: number;
  name: string;
  price: string;
  imageURI: string;
  weatherIconName: string;
  distanceKm: string;
  temperature: string;
  weatherDescription: string;
  loveCount: number;
  commentCount: number;
}[] = [
  {
    id: Math.random(),
    name: "New York Art Museum",
    price: "$967",
    distanceKm: "257 km",
    imageURI: museum_photo,
    weatherIconName: "sunny",
    temperature: "25",
    weatherDescription: "Sunny",
    loveCount: 4000,
    commentCount: 766
  },
  {
    id: Math.random(),
    name: "Hotel St. Martin",
    price: "$967",
    distanceKm: "34 km",
    imageURI: hotel_photo,
    weatherIconName: "cloudy",
    temperature: "17",
    weatherDescription: "Cloudy",
    loveCount: 392,
    commentCount: 85
  },
  {
    id: Math.random(),
    name: "New York Art Museum",
    price: "$967",
    distanceKm: "257 km",
    imageURI: museum_photo,
    weatherIconName: "sunny",
    temperature: "25",
    weatherDescription: "Sunny",
    loveCount: 4000,
    commentCount: 766
  },
  {
    id: Math.random(),
    name: "Hotel St. Martin",
    price: "$967",
    distanceKm: "34 km",
    imageURI: hotel_photo,
    weatherIconName: "cloudy",
    temperature: "17",
    weatherDescription: "Cloudy",
    loveCount: 392,
    commentCount: 85
  },
  {
    id: Math.random(),
    name: "New York Art Museum",
    price: "$967",
    imageURI: museum_photo,
    distanceKm: "257 km",
    weatherIconName: "sunny",
    temperature: "25",
    weatherDescription: "Sunny",
    loveCount: 4000,
    commentCount: 766
  }
];
