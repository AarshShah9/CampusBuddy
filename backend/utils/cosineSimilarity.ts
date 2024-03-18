const dotProduct = (vectorA: number[], vectorB: number[]) => {
  return vectorA.reduce(
    (acc: number, value: number, index: number) => acc + value * vectorB[index],
    0,
  );
};

const magnitude = (vector: number[]) => {
  return Math.sqrt(
    vector.reduce((acc: number, value: number) => acc + value ** 2, 0),
  );
};

const cosineSimilarity = (vectorA: number[], vectorB: number[]) => {
  const dotProd = dotProduct(vectorA, vectorB);
  const magA = magnitude(vectorA);
  const magB = magnitude(vectorB);

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dotProd / (magA * magB);
};

export default cosineSimilarity;
