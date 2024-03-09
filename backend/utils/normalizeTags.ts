type tag =
  | {
      id: number;
      name: string;
    }[]
  | undefined;

const normalizeTags = (
  tagsDenormalized: tag[] | any[],
  tagsReference: tag[] | any[],
) => {
  const normalizedTags: number[] = new Array(tagsReference.length).fill(2);

  tagsDenormalized.forEach((tagDenormalized) => {
    const tagIndex = tagsReference.findIndex(
      (tagsReference) => tagsReference.id === tagDenormalized.id,
    );
    if (tagIndex !== -1) {
      normalizedTags[tagIndex] = 2;
    }
  });
  return normalizedTags;
};

export default normalizeTags;
