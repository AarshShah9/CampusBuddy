import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { Button, Checkbox } from "react-native-paper";
import ItemTag from "~/components/ItemTags";
import LocationInputModal from "~/components/LocationInputModal";
import { imageGetter, imageGetterV2 } from "~/lib/requestHelpers";

const IMG_HEIGHT = 300;
type marketPlaceDetail = {
  image: string;
  itemName: string;
  price: string;
  condition: string;
  description: string;
  tags: string[];
  location: string;
};

// React Hook Form Section
const schema = zod.object({
  image: zod.string(),
  itemName: zod.string(),
  price: zod.string(),
  condition: zod.string(),
  description: zod.string(),
  tags: zod.string().array(),
  location: zod.string(),
});

export default function CreateMarketplace() {
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [checkedItem, setCheckedItem] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>();
  const handleCheckboxToggle = (item: string) => {
    setCheckedItem(item === checkedItem ? null : item);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<marketPlaceDetail>({
    defaultValues: {
      image: "",
      itemName: "",
      price: "",
      condition: "",
      description: "",
      tags: [],
      location: "",
    },
    resolver: zodResolver(schema),
  });

  // Handle submission of data to backend
  const onSubmit = (data: marketPlaceDetail) => {
    console.log(data);
  };

  const addPhoto = useCallback(async () => {
    // Calculate the remaining number of images that can be selected
    const remainingImagesCount =
      10 - (selectedImages ? selectedImages.length : 0);

    const result = await imageGetterV2({
      multiple: true,
      allowEditing: false,
      maxSize: remainingImagesCount,
    });

    if (result.canceled || !result.assets) {
      return;
    }

    const newImages = result.assets.map((asset) => asset.uri);

    setSelectedImages((currentImages) => {
      if (currentImages) {
        return [...currentImages, ...newImages].slice(0, 10);
      }
      return newImages;
    });
  }, [selectedImages]);

  const replacePhoto = useCallback(async (index: number) => {
    const result = await imageGetterV2({ multiple: false });
    if (result.canceled || !result.assets) {
      return;
    }

    // Update the image at the specific index
    setSelectedImages((currentImages) => {
      if (currentImages) {
        const updatedImages = [...currentImages];
        updatedImages[index] = result.assets[0].uri;
        return updatedImages;
      }
      return currentImages;
    });
  }, []);

  const showDeleteMenu = (index: number) => {
    Alert.alert(
      "Delete Image",
      "Do you want to delete this image?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteImage(index) },
      ],
      { cancelable: false },
    );
  };

  const deleteImage = useCallback((index: number) => {
    setSelectedImages((currentImages) => {
      if (currentImages) {
        const updatedImages = [...currentImages];
        updatedImages.splice(index, 1);
        return updatedImages;
      }
      return currentImages;
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Animated.ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        style={{ height: "100%", backgroundColor: "white" }}
        scrollEventThrottle={16}
      >
        <View style={{ marginLeft: 20, marginTop: 15 }}>
          {/* View holds the icon for user to click to upload their own image */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={addPhoto} style={{ marginRight: 10 }}>
              {!selectedImages && (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "grey",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather name="image" size={24} color="black" />
                  <Text style={{ color: "white", paddingTop: 10 }}>
                    Add Image
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {selectedImages &&
              selectedImages.map((uri, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => replacePhoto(index)}
                  onLongPress={() => showDeleteMenu(index)}
                  style={{ marginRight: 10 }}
                >
                  <Animated.Image
                    source={{ uri }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                    }}
                  />
                </TouchableOpacity>
              ))}
            {selectedImages && selectedImages.length < 10 && (
              <TouchableOpacity
                onPress={addPhoto}
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                  backgroundColor: "grey",
                  borderRadius: 8,
                }}
              >
                <Feather name="plus-circle" size={24} color="white" />
                <Text style={{ color: "white", paddingTop: 10 }}>
                  Add Image
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
          {/* View holds all the Controllers for user to enter their information */}
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginTop: 15, marginBottom: 15 }}>
                  <Text
                    style={{
                      marginBottom: 3,
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                    }}
                  >
                    Item
                  </Text>
                  <TextInput
                    style={style.eventInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="itemName"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginTop: 10, marginBottom: 15 }}>
                  <Text
                    style={{
                      marginBottom: 3,
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                    }}
                  >
                    Price
                  </Text>
                  <TextInput
                    style={style.priceInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="price"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text
                    style={{
                      marginBottom: 3,
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                    }}
                  >
                    Condition
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox.Android
                      uncheckedColor="black"
                      status={
                        checkedItem === "Brand New" ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        handleCheckboxToggle("Brand New");
                        onChange("Brand New");
                      }}
                    />
                    <Text>Like Brand New</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox.Android
                      status={checkedItem === "Used" ? "checked" : "unchecked"}
                      onPress={() => {
                        handleCheckboxToggle("Used");
                        onChange("Used");
                      }}
                    />
                    <Text>Used</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      marginBottom: 15,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox.Android
                      uncheckedColor="black"
                      status={
                        checkedItem === "Heavily Used" ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        handleCheckboxToggle("Heavily Used");
                        onChange("Heavily Used");
                      }}
                    />
                    <Text>Heavily Used</Text>
                  </View>
                </View>
              )}
              name="condition"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text
                    style={{
                      marginBottom: 3,
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                    }}
                  >
                    Event Description:*
                  </Text>
                  <TextInput
                    style={style.eventtextInput}
                    multiline={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="description"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      marginBottom: 3,
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                    }}
                  >
                    Tags*
                  </Text>
                  <ItemTag controllerOnChange={onChange} />
                </View>
              )}
              name="tags"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      marginBottom: 3,
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                    }}
                  >
                    Location*
                  </Text>
                  <LocationInputModal controllerOnChange={onChange} />
                </View>
              )}
              name="location"
            />
          </View>
        </View>
        <View style={{ marginTop: 50, marginBottom: 50 }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            style={{
              width: 300,
              backgroundColor: theme.colors.primary,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Roboto-Bold",
                fontSize: 24,
                lineHeight: 30,
              }}
            >
              Post
            </Text>
          </Button>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}
const style = StyleSheet.create({
  priceInput: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
    padding: 10,
  },
  eventtextInput: {
    textAlignVertical: "top",
    width: 350,
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
    padding: 10,
    marginRight: "auto",
  },
  eventInput: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
    padding: 10,
  },
});
