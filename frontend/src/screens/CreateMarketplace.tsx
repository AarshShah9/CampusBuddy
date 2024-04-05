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
import * as zod from "zod";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { Button, Checkbox, ProgressBar } from "react-native-paper";
import LocationInputModal from "~/components/LocationInputModal";
import { imageGetterV2 } from "~/lib/requestHelpers";
import { ImagePickerAsset } from "expo-image-picker";
import { MarketPlaceItem } from "~/types/MarketPlaceItem";
import { createMarketPlaceItem } from "~/lib/apiFunctions/Items";
import { useMutation } from "@tanstack/react-query";

// React Hook Form Section
const schema = zod.object({
  title: zod.string(),
  price: zod.string(),
  condition: zod.string(),
  description: zod.string(),
  locationPlaceId: zod.string(),
  // tags: zod.string().array(),
});

export default function CreateMarketplace() {
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [checkedItem, setCheckedItem] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>();
  const [resetLocationValue, setResetLocationValue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxToggle = (item: string) => {
    setCheckedItem(item === checkedItem ? null : item);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MarketPlaceItem>({
    defaultValues: {
      title: "",
      price: "",
      condition: "",
      description: "",
      locationPlaceId: "",
    },
    // resolver: zodResolver(schema),
  });

  // Handle submission of data to backend
  const onSubmit = (data: MarketPlaceItem) => {
    if (!selectedImages) {
      Alert.alert("Image Required", "Please upload at least one image");
      return;
    }
    setIsSubmitting(true);
    createMutation.mutate(data);
  };

  const createMutation = useMutation({
    mutationFn: (data: MarketPlaceItem) =>
      createMarketPlaceItem(data, selectedImages!),
    onSuccess: () => {
      reset();
      setSelectedImages(undefined);
      setCheckedItem(null);
      setResetLocationValue(!resetLocationValue);
      setIsSubmitting(false);
      Alert.alert("Success", "Your item has been posted");
    },
    onError: (error) => {
      console.log(error);
      setIsSubmitting(false);
      alert("Error creating event");
    },
  });

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

    setSelectedImages((currentImages) => {
      if (currentImages) {
        return [...currentImages, ...result.assets].slice(0, 10);
      }
      return result.assets;
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
        updatedImages[index] = result.assets[0];
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
      {createMutation.isPending && (
        <ProgressBar indeterminate={true} visible={createMutation.isPending} />
      )}
      <Animated.ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        style={{ height: "100%", backgroundColor: theme.colors.tertiary }}
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
              selectedImages.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => replacePhoto(index)}
                  onLongPress={() => showDeleteMenu(index)}
                  style={{ marginRight: 10 }}
                >
                  <Animated.Image
                    source={{ uri: image.uri }}
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
                      color: theme.colors.text,
                    }}
                  >
                    Item
                  </Text>
                  <TextInput
                    editable={!isSubmitting}
                    style={[style.eventInput, { color: theme.colors.text }]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="title"
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
                      color: theme.colors.text,
                    }}
                  >
                    Price
                  </Text>
                  <TextInput
                    editable={!isSubmitting}
                    style={[style.priceInput, { color: theme.colors.text }]}
                    onBlur={onBlur}
                    onChangeText={(text) =>
                      onChange(text.replace(/[^0-9]/g, ""))
                    }
                    value={value}
                    keyboardType="numeric"
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
                      color: theme.colors.text,
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
                      uncheckedColor={theme.colors.checkboxColor}
                      status={
                        checkedItem === "Brand New" ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        handleCheckboxToggle("Brand New");
                        onChange("Brand New");
                      }}
                    />
                    <Text style={{ color: theme.colors.text }}>
                      Like Brand New
                    </Text>
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
                      uncheckedColor={theme.colors.checkboxColor}
                      onPress={() => {
                        handleCheckboxToggle("Used");
                        onChange("Used");
                      }}
                    />
                    <Text style={{ color: theme.colors.text }}>Used</Text>
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
                      uncheckedColor={theme.colors.checkboxColor}
                      status={
                        checkedItem === "Heavily Used" ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        handleCheckboxToggle("Heavily Used");
                        onChange("Heavily Used");
                      }}
                    />
                    <Text style={{ color: theme.colors.text }}>
                      Heavily Used
                    </Text>
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
                      color: theme.colors.text,
                    }}
                  >
                    Event Description:*
                  </Text>
                  <TextInput
                    editable={!isSubmitting}
                    style={[style.eventtextInput, { color: theme.colors.text }]}
                    multiline={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="description"
            />
            {/*  TODO BRING BACK IF WE NEED?*/}
            {/*<Controller*/}
            {/*  control={control}*/}
            {/*  rules={{*/}
            {/*    required: true,*/}
            {/*  }}*/}
            {/*  render={({ field: { onChange } }) => (*/}
            {/*    <View style={{ marginTop: 15 }}>*/}
            {/*      <Text*/}
            {/*        style={{*/}
            {/*          marginBottom: 3,*/}
            {/*          fontFamily: "Nunito-Medium",*/}
            {/*          fontSize: 16,*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        Tags**/}
            {/*      </Text>*/}
            {/*      <ItemTag controllerOnChange={onChange} />*/}
            {/*    </View>*/}
            {/*  )}*/}
            {/*  name="tags"*/}
            {/*/>*/}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginBottom: 10, marginTop: 15 }}>
                  <Text
                    style={{
                      marginBottom: 3,
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                      color: theme.colors.text,
                    }}
                  >
                    Location*
                  </Text>
                  <LocationInputModal
                    controllerOnChange={onChange}
                    reset={resetLocationValue}
                  />
                </View>
              )}
              name="locationPlaceId"
            />
          </View>
        </View>
        <View style={{ marginTop: 50, marginBottom: 50 }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
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
