import { View, Text, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import styled from "styled-components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import useThemeContext from "~/hooks/useThemeContext";

type lookingForDetail = {
  title: string;
  tags: string;
  description: string;
  location: string;
  numOfSpots: string;
  expiryDate: Date;
};

export default function CreateLookingFor() {
  const { theme } = useThemeContext();
  // React Hook Detail
  const schema = zod.object({
    title: zod.string(),
    tags: zod.string(),
    description: zod.string(),
    location: zod.string(),
    numOfSpots: zod.string(),
    expiryDate: zod.date(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<lookingForDetail>({
    defaultValues: {
      title: "",
      tags: "",
      description: "",
      location: "",
      numOfSpots: "",
      expiryDate: new Date(),
    },
    resolver: zodResolver(schema),
  });

  //Functions
  const onSubmit = (data: lookingForDetail) => {
    console.log(data);
  };

  return (
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
            <InputBox onBlur={onBlur} onChangeText={onChange} value={value} />
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
                marginLeft: 20,
                marginBottom: 3,
                fontFamily: "Nunito-Medium",
                fontSize: 16,
              }}
            >
              Tags(minimum 1 required)*
            </Text>
            <InputBox onBlur={onBlur} onChangeText={onChange} value={value} />
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
            <InputBox onBlur={onBlur} onChangeText={onChange} value={value} />
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
            <NumberOfSpotBox
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="numeric"
              placeholder="0"
              value={value}
            />
          </View>
        )}
        name="numOfSpots"
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
              mode={"date"}
              is24Hour={true}
              onChange={(event, date) => {
                onChange(date);
              }}
            />
          </View>
        )}
        name="expiryDate"
      />
      <View style={{ marginTop: 150 }}>
        <Button
          style={{
            backgroundColor: theme.colors.primary,
            width: 300,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            style={{ color: "white", fontFamily: "Roboto-Bold", fontSize: 24, lineHeight: 30 }}
          >
            Post
          </Text>
        </Button>
      </View>
    </View>
  );
}

// prettier-ignore
const InputBox = styled(TextInput)`
    width: 350px;
    height: 50px;
    borderWidth: 1px;
    borderRadius: 8px;
    borderColor: grey;
    padding: 10px;
    marginLeft: auto;
    marginRight: auto;
`
// prettier-ignore
const NumberOfSpotBox = styled(TextInput)`
    width: 100px;
    height: 50px;
    borderWidth: 1px;
    borderRadius: 8px;
    borderColor: grey;
    padding: 10px;
    marginLeft: 30px;
`
