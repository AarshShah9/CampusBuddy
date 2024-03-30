import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { z } from "zod";
import { Button, ProgressBar } from "react-native-paper";
import ItemTag from "~/components/ItemTags";
import { useCallback, useState } from "react";
import LocationInputModal from "~/components/LocationInputModal";
import { imageGetter } from "~/lib/requestHelpers";
import { ImagePickerAsset } from "expo-image-picker";
import useLoadingContext from "~/hooks/useLoadingContext";
import useNavigationContext from "~/hooks/useNavigationContext";
import { createEvent } from "~/lib/apiFunctions/Events";
import { useMutation } from "@tanstack/react-query";

const IMG_HEIGHT = 300;

export type createEventType = z.infer<typeof schema>;

// React Hook Related
const schema = zod.object({
  title: zod.string(),
  date: zod.date(),
  startTime: zod.date(),
  endTime: zod.date(),
  locationPlaceId: zod.string(),
  tags: zod.string().array(),
  description: zod.string(),
});
// Component is responsible for allowing users to create a new event page
export default function CreateEvent() {
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [image, setImage] = useState<ImagePickerAsset>();
  const [resetLocationValue, setResetLocationValue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createEventType>({
    defaultValues: {
      title: "",
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      locationPlaceId: "",
      tags: [],
      description: "",
    },
    resolver: zodResolver(schema),
  });

  // Handle submission of user data
  const onSubmit = useCallback(
    (data: createEventType) => {
      if (!image) {
        alert("Please upload an image");
        return;
      }
      setIsSubmitting(true);
      createMutation.mutate(data);
    },
    [resetLocationValue, image, createEvent, reset],
  );

  const createMutation = useMutation({
    mutationFn: (data: createEventType) => createEvent(data, image!),
    onSuccess: () => {
      reset();
      setImage(undefined);
      setSelectedImage(undefined);
      setResetLocationValue(!resetLocationValue);
      setIsSubmitting(false);
      Alert.alert("Event Created", "Your event has been created successfully");
    },
    onError: (error) => {
      console.log(error);
      setIsSubmitting(false);
      alert("Error creating event");
    },
  });

  //  Animation of scroll image
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [3, 1, 1],
          ),
        },
      ],
    };
  });

  const addPhoto = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    const result = await imageGetter();
    if (result.canceled) {
      return;
    }
    setSelectedImage(result.assets[0].uri);
    setImage(result.assets[0]);
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
        {/* View houses the image component, and icon for uploading images */}
        <View>
          <Animated.Image
            source={
              selectedImage
                ? { uri: selectedImage }
                : require("~/assets/images/lightGreyImage.png")
            }
            style={[
              {
                width: "100%",
                height: 250,
              },
              imageAnimatedStyle,
            ]}
          />
          <AntDesign
            style={{
              position: "absolute",
              marginLeft: "90%",
              marginBottom: 10,
              marginTop: 200,
            }}
            name="upload"
            size={24}
            color="black"
            onPress={addPhoto}
          />
        </View>
        {/* View houses the controllers for each field */}
        <View style={{ backgroundColor: theme.colors.tertiary }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginTop: 10, marginBottom: 15, marginLeft: 15 }}>
                <Text
                  style={{
                    marginBottom: 3,
                    fontFamily: "Nunito-Medium",
                    fontSize: 16,
                    color: theme.colors.text,
                  }}
                >
                  Event Name*
                </Text>
                <TextInput
                  style={[style.eventTextInput, { color: theme.colors.text }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!isSubmitting}
                />
              </View>
            )}
            name="title"
          />
          <View style={{ marginLeft: 15 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    height: 30,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 25,
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                      color: theme.colors.text,
                    }}
                  >
                    Start Time*
                  </Text>
                  <DateTimePicker
                    style={{ marginRight: 10 }}
                    value={value}
                    mode={"datetime"}
                    onChange={(event, time) => {
                      onChange(time);
                    }}
                    disabled={isSubmitting}
                  />
                </View>
              )}
              name="startTime"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    height: 30,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 25,
                    marginBottom: 25,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                      color: theme.colors.text,
                    }}
                  >
                    End Time*
                  </Text>
                  <DateTimePicker
                    style={{ marginRight: 10 }}
                    value={value}
                    mode={"datetime"}
                    onChange={(event, time) => {
                      onChange(time);
                    }}
                    disabled={isSubmitting}
                  />
                </View>
              )}
              name="endTime"
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

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <View style={[style.tagInput]}>
                  <Text
                    style={{
                      marginBottom: 3,
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                      color: theme.colors.text,
                    }}
                  >
                    Tags*
                  </Text>
                  <ItemTag
                    controllerOnChange={onChange}
                    editable={!isSubmitting}
                  />
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
                    style={[
                      style.eventDescriptionInput,
                      { color: theme.colors.text },
                    ]}
                    multiline={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!isSubmitting}
                  />
                </View>
              )}
              name="description"
            />
          </View>
          <View style={{ paddingBottom: 30, marginTop: 15 }}>
            <Button
              style={{
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: theme.colors.primary,
              }}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Roboto-Bold",
                  fontSize: 24,
                  lineHeight: 30,
                }}
              >
                Submit
              </Text>
            </Button>
          </View>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  eventDescriptionInput: {
    textAlignVertical: "top",
    width: 350,
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
    padding: 10,
  },
  tagInput: {
    width: 368,
  },
  eventTextInput: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
  },
});
