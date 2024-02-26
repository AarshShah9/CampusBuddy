import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
import { Button } from "react-native-paper";
import ItemTag from "~/components/ItemTags";
import { useCallback } from "react";
import LocationInputModal from "~/components/LocationInputModal";

const IMG_HEIGHT = 300;

type createEvent = {
  eventName: string;
  date: Date;
  time: Date;
  location: string;
  tags: string[];
  description: string;
};
// Component is responsible for allowing users to create a new event page
export default function CreateEvent() {
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);

  // React Hook Related
  const schema = zod.object({
    eventName: zod.string(),
    date: zod.date(),
    time: zod.date(),
    location: zod.string(),
    tags: zod.string().array(),
    description: zod.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createEvent>({
    defaultValues: {
      eventName: "",
      date: new Date(),
      time: new Date(),
      location: "",
      tags: [],
      description: "",
    },
    resolver: zodResolver(schema),
  });

  //Functions

  // Handle submission of user data
  const onSubmit = useCallback((data: createEvent) => {
    console.log(data);
  }, []);

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
        {/* View houses the image component, and icon for uploading images */}
        <View>
          <Animated.Image
            source={require("~/assets/images/lightGreyImage.png")}
            style={[
              {
                width: "100%",
                height: 250,
              },
              imageAnimatedStyle,
            ]}
          ></Animated.Image>
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
          />
        </View>
        {/* View houses the controllers for each field */}
        <View style={{ backgroundColor: "white" }}>
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
                  }}
                >
                  Event Name*
                </Text>
                <TextInput
                  style={style.eventTextInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="eventName"
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
                    }}
                  >
                    Date *
                  </Text>
                  <DateTimePicker
                    style={{ marginRight: 10 }}
                    value={value}
                    mode={"date"}
                    is24Hour={true}
                    onChange={(event, date) => {
                      onChange(date);
                    }}
                  />
                </View>
              )}
              name="date"
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
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Nunito-Medium",
                      fontSize: 16,
                    }}
                  >
                    Time*
                  </Text>
                  <DateTimePicker
                    style={{ marginRight: 10 }}
                    value={value}
                    mode={"time"}
                    is24Hour={true}
                    onChange={(event, time) => {
                      onChange(time);
                    }}
                  />
                </View>
              )}
              name="time"
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

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <View>
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
                    style={style.eventDescriptionInput}
                    multiline={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
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
  eventTextInput: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
  },
});
