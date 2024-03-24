import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import useThemeContext from "~/hooks/useThemeContext";
import ItemTag from "~/components/ItemTags";
import useEventsContext from "~/hooks/useEventsContext";
import useAppContext from "~/hooks/useAppContext";

// React Hook Section
const schema = zod.object({
  title: zod.string(),
  tags: zod.string().array().optional(),
  description: zod.string(),
  numberOfSpots: zod.string(),
  expiryDate: zod.date(),
});

type lookingForDetail = {
  title: string;
  tags?: string[];
  description: string;
  numberOfSpots: string;
  expiryDate: Date;
};

export default function CreateLookingFor() {
  const { theme } = useThemeContext();
  const { createPost } = useEventsContext();
  const { navigateTo } = useAppContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<lookingForDetail>({
    defaultValues: {
      title: "",
      tags: [],
      description: "",
      numberOfSpots: "0",
      expiryDate: new Date(),
    },
    resolver: zodResolver(schema),
  });

  // Handles submission of user data
  const onSubmit = (data: lookingForDetail) => {
    console.log(data);
    createPost({
      title: data.title,
      description: data.description,
      numberOfSpots: parseInt(data.numberOfSpots),
      expiresAt: data.expiryDate,
    })
      .then((r) => {
        alert("Event Created");
        reset();
        navigateTo({ page: "Home" });
      })
      .catch((e) => {
        console.log(e);
        alert("Error creating event");
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ backgroundColor: "white", flexGrow: 1 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginTop: 20, marginBottom: 15 }}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 3,
                  fontFamily: "Nunito-Medium",
                  fontSize: 16,
                }}
              >
                Title*
              </Text>
              <TextInput
                style={style.inputBox}
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
          render={({ field: { onChange } }) => (
            <View style={{ marginLeft: 20 }}>
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
            <View style={{ marginTop: 10, marginBottom: 15 }}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 3,
                  fontFamily: "Nunito-Medium",
                  fontSize: 16,
                }}
              >
                Description*
              </Text>
              <TextInput
                style={style.inputBox}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginTop: 10, marginBottom: 15 }}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 3,
                  fontFamily: "Nunito-Medium",
                  fontSize: 16,
                }}
              >
                # of Spots Needed*
              </Text>
              <TextInput
                style={style.numberOfSpotContainer}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="numeric"
                // TODO restrict to whole numbers
                placeholder="0"
                value={value}
              />
            </View>
          )}
          name="numberOfSpots"
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
                  marginLeft: 20,
                  fontFamily: "Nunito-Medium",
                  fontSize: 16,
                }}
              >
                Expiry Date*
              </Text>
              <DateTimePicker
                style={{ marginRight: 10 }}
                value={value}
                mode={"datetime"}
                onChange={(event, time) => {
                  onChange(time);
                }}
              />
            </View>
          )}
          name="expiryDate"
        />
        <View style={{ marginTop: 100 }}>
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
              Post
            </Text>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// prettier-ignore

const style = StyleSheet.create({
  inputBox:{
    width:350,
    height:50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor:"grey",
    marginLeft:20
  },
  numberOfSpotContainer:{
    width:100,
    height:50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor:"grey",
    padding:10,
    marginLeft:20
  }
})
