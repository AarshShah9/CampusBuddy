export const getCoordinatesFromPlaceId = async (placeId: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    let response = await fetch(url);
    let data: any = await response.json();
    return data.result.geometry.location;
  } catch (error) {
    console.log(error);
  }
};
