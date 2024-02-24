import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
import { useState } from "react";
import { Button, Checkbox } from "react-native-paper";
import ItemTag from "~/components/ItemTags";
import LocationInputModal from "~/components/LocationInputModal";

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

export default function CreateMarketplace() {
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);
  const [checkedItem, setCheckedItem] = useState<string | null>(null);

  const handleCheckboxToggle = (item: string) => {
    setCheckedItem(item === checkedItem ? null : item);
  };

  const schema = zod.object({
    image: zod.string(),
    itemName: zod.string(),
    price: zod.string(),
    condition: zod.string(),
    description: zod.string(),
    tags: zod.string().array(),
    location: zod.string(),
  });

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

  const onSubmit = (data: marketPlaceDetail) => {
    console.log(data);
  };

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
        <View style={{ marginLeft: 20, marginTop: 15 }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "grey",
              borderRadius: 8,
              justifyContent: "center",
            }}
          >
            <Feather
              style={{ marginLeft: "auto", marginRight: "auto" }}
              name="image"
              size={24}
              color="black"
            />
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                color: "white",
              }}
            >
              Add Image
            </Text>
          </View>
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
