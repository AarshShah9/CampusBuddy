export async function getCoordinatesFromPlaceId(placeId: string) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    let response = await fetch(url);
    let data: any = await response.json();
    return data.result.geometry.location;
  } catch (error) {
    console.log(error);
  }
}

export async function getPlaceNameFromPlaceId(placeId: string) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    let response = await fetch(url);
    let data: any = await response.json();
    return data.result.name;
  } catch (error) {
    console.log(error);
  }
}

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
