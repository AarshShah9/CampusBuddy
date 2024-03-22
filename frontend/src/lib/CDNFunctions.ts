export const generateImageURL = (image: string) => {
  if (!image) return image;
  if (image.includes("cloudfront")) return image;
  return `https://d2epenzoyf672m.cloudfront.net/${image}`;
};
