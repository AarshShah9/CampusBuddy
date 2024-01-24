import { View, Text, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, TextInput } from "react-native-paper";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

type signUpSchool = {
    uniEmail: string,
    uniName: string,
    fName: string,
    lName: string,
    password: string,
    rePassword:string,
}

export default function StudentSignUp() {
    const { theme } = useThemeContext();
    const navigation = useNavigation<any>();
    const [valid, setValid] = useState(false);

    const schema = zod.object({
        uniEmail: zod.string(),
        uniName: zod.string(),
        fName: zod.string(),
        lName: zod.string(),
        password: zod.string(),
        rePassword: zod.string()
    });

    const { control, handleSubmit, formState: { errors } } = useForm<signUpSchool>({
        defaultValues: {
            uniEmail: '',
            uniName: '',
            fName: '',
            lName: '',
            password: '',
            rePassword: ''
        },
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: signUpSchool) => {
        console.log(data)
        navigation.navigate("StudentSignUpInfo")
        //validate()
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <MainContainer>
                <HeaderContainer>
                    <AntDesign
                        style={{ marginTop: "10%", marginLeft: "3%" }}
                        name="caretleft"
                        size={24}
                        color="white"
                        onPress={() => navigation.navigate("Login")}
                    />
                    <HeaderText $textColor={theme.colors.tertiary}>
                        Student Sign Up
                    </HeaderText>
                </HeaderContainer>
                <OverlayContainer $color={theme.colors.tertiary}>
                    <FormContainer>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    label="Institution Email"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="uniEmail"
                        />
                        {errors.uniEmail && <Text>University Email is required.</Text>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    label="Institution Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="uniName"
                        />
                        {errors.uniName && <Text>Institution Name is required.</Text>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    label="First Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="fName"
                        />
                        {errors.fName && <Text>Institution Name is required.</Text>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    label="Last Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="lName"
                        />
                        {errors.lName && <Text>Institution Name is required.</Text>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    label="Password"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="password"
                        />
                        {errors.password && <Text>Institution Name is required.</Text>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    label="Retype Password"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="rePassword"
                        />
                        {errors.rePassword && <Text>Institution Name is required.</Text>}
                        <StyledButton
                            mode="contained"
                            onPress={() => {
                                console.log("Pressed")
                            }}
                        >
                            <Text
                                style={{lineHeight:30, fontSize: 24, fontWeight: "bold", color: "white" ,fontFamily:"Nunito-Bold" }}
                            >
                                Next
                            </Text>
                        </StyledButton>
                        <ClickLink $color={theme.colors.primary}>
                            <Text>Sign up as an Organization </Text>
                            <Text
                                onPress={() => {
                                    console.log("Pressed");
                                }}
                                style={{ color: theme.colors.primary, fontSize: 16, fontFamily: "Roboto-Reg" }}
                            >
                                here
                            </Text>
                        </ClickLink>
                    </FormContainer>
                </OverlayContainer>
            </MainContainer>
        </TouchableWithoutFeedback>
    );
}

// Component
const MainContainer = styled(View)`
  height: 100%;
  background-color: #3a86ff;
`;
const OverlayContainer = styled(View) <{ $color: string }>`
    alignItems: center;
    height: 85%;
    width: 100%;
    border-top-left-radius: 76px;
    background-color: ${(props) => props.$color};
`;
const HeaderContainer = styled(View)`
  width: 100%;
  height: 15%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const HeaderText = styled(Text) <{ $textColor: string }>`
  margin: 32px auto 0px auto;
  color: ${(props) => props.$textColor};
  font-size: 28px;
  font-weight: bold;
  fontFamily:"Nunito-Bold"
`;

const FormContainer = styled(View)`
    width: 90%;
    margin-top: 18%;
    height: 500px;
`;

const InputField = styled(TextInput)`
    width: 100%;
    height: 56px;
    margin-bottom: 25px;
    border-radius: 8px 8px 0 0;
    font-family: Roboto-Reg
`;

const StyledButton = styled(Button)`
    border-radius: 8px;
    width: 100%;
    height: 48px;
    font-size: 25px;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    justify-content: center;
  
`;
const ClickLink = styled(Text) <{ $color: string }>`
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
`;
