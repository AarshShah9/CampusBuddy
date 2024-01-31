import * as ImagePicker from "expo-image-picker";

const imageGetter = async () => {
  return await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
};

export default imageGetter;
