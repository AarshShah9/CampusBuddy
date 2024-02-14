import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styled from "styled-components";
import useThemeContext from "~/hooks/useThemeContext";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
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
import { useRef } from "react";

const IMG_HEIGHT = 300;

type createEvent = {
  eventName: string;
  date: Date;
  time: Date;
  location: string;
  tags: string;
  description: string;
};

export default function CreateEvent() {
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);
  const inputRef = useRef();


  const onSubmit = (data: createEvent) => {
    console.log(data);
  };
  const schema = zod.object({
    eventName: zod.string(),
    date: zod.date(),
    time: zod.date(),
    location: zod.string(),
    tags: zod.string(),
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
      tags: "",
      description: "",
    },
    resolver: zodResolver(schema),
  });

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

  const pages = [
    { label: "Event", value: "1" },
    { label: "Looking For", value: "2" },
    { label: "Marketplace", value: "3" },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}  
    >
      <MainContainer style={{}} color={theme.colors.primary}>
        <HeaderContainer>
          <MaterialIcons
            style={{ marginTop: 60, marginLeft: 10 }}
            name="cancel"
            size={24}
            color="white"
          />
          <Dropdown
            style={{ width: 125, marginTop: 50, paddingRight: 5 }}
            placeholderStyle={{ color: "white", paddingLeft: 40 }}
            selectedTextStyle={{ color: "white" }}
            maxHeight={300}
            labelField="label"
            valueField="value"
            onChange={() => {}}
            data={pages}
            placeholder="Event"
          />
        </HeaderContainer>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          style={{ height: "100%", backgroundColor: "white" }}
          scrollEventThrottle={16}
        >
          <View
            style={{
              backgroundColor: "#D9D9D9",
              width: "100%",
              height: 250,
              flexDirection: "column-reverse",
            }}
          >
            <AntDesign
              style={{ marginLeft: "auto", marginRight: 10, marginBottom: 10 }}
              name="upload"
              size={24}
              color="black"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={{ marginLeft: 20 }}>Event Name:*</Text>
                  <TextInput
                    style={{
                      width: 350,
                      height: 50,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: "grey",
                      padding: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="eventName"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              height: 30,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 25,
            }}
          >
            <Text style={{ marginLeft: 20 }}>Date *</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DateTimePicker
                  style={{ marginRight: 10 }}
                  value={value}
                  mode={"date"}
                  is24Hour={true}
                  onChange={(event, date) => {
                    onChange(date);
                  }}
                />
              )}
              name="date"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 30,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 25,
            }}
          >
            <Text style={{ marginLeft: 20 }}>Time*</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DateTimePicker
                  style={{ marginRight: 10 }}
                  value={value}
                  mode={"time"}
                  is24Hour={true}
                  onChange={(event, time) => {
                    onChange(time);
                  }}
                />
              )}
              name="time"
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={{ marginLeft: 20 }}>Location*</Text>
                  <TextInput
                    style={{
                      width: 350,
                      height: 50,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: "grey",
                      padding: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="location"
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={{ marginLeft: 20 }}>Tags*</Text>
                  <TextInput
                    style={{
                      width: 350,
                      height: 50,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: "grey",
                      padding: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="tags"
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={{ marginLeft: 20 }}>Event Description:*</Text>
                  <TextInput
                    
                    multiline={true}
                    style={{
                      textAlignVertical: "top",
                      width: 350,
                      height: 100,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: "grey",
                      padding: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="description"
            />
          </View>
          <View style={{ marginBottom: 15, marginTop: 15 }}>
            <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
          </View>
        </Animated.ScrollView>
      </MainContainer>
    </KeyboardAvoidingView>
  );
}
const MainContainer = styled(View)<{ color: string }>`
  height: 100%;
  background-color: ${(props) => props.color};
`;

const HeaderContainer = styled(View)`
  width: 100%;
  height: 100px;
  justify-content: space-between;
  flex-direction: row;
`;
