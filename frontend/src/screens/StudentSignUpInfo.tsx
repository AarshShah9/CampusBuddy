import { useNavigation } from "@react-navigation/native";
import {Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";
import InputField from "~/components/InputField";
import useThemeContext from "~/hooks/useThemeContext";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

type studentInfo = {
    fName: string,
    lName: string,
    password: string,
    rePassword: string
  }
  

export default function StudentSignUpInfo() {
    const { theme } = useThemeContext();
    const navigation = useNavigation<any>();

    const schema = zod.object({
        fName: zod.string(),
        lName: zod.string(),
        password: zod.string(),
        rePassword: zod.string()
      });
      
    const { control, handleSubmit, formState: { errors } } = useForm<studentInfo>({
        defaultValues: {
            fName: '',
            lName: '',
            password: '',
            rePassword: ''
        },
        resolver: zodResolver(schema)
    })

  const onSubmit = (data: studentInfo) => {
    console.log(data)
    //validate()
    }
    return(
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
                        <TextInput
                            placeholder="First Name"
                            //label =""
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        )}
                        name="fName"
                    />
                    {errors.fName && <Text>First Name is required.</Text>}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Last Name"
                            //label =""
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        )}
                        name="lName"
                    />
                    {errors.lName && <Text>First Name is required.</Text>}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Password"
                            //label =""
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        )}
                        name="password"
                    />
                    {errors.password && <Text>First Name is required.</Text>}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Retype Password"
                            //label =""
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        )}
                        name="rePassword"
                    />
                    {errors.rePassword && <Text>First Name is required.</Text>}
                    <StyledButton mode="contained" onPress={() => {}}>
                        <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "white",
                            fontFamily: "Nunito-Bold",
                        }}
                        >
                        Agree and Continue
                        </Text>
                    </StyledButton>
                </FormContainer>;
            </OverlayContainer>
        </MainContainer>
    </TouchableWithoutFeedback>
    );
}
const MainContainer = styled(View)`
  height: 100%;
  background-color: #3a86ff;
`;
const OverlayContainer = styled(View)<{ $color: string }>`
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
const HeaderText = styled(Text)<{ $textColor: string }>`
  margin: 32px auto 0px auto;
  color: ${(props) => props.$textColor};
  font-size: 28px;
  font-weight: bold;
  fontFamily:"Nunito-Bold"
`;

const FormContainer = styled(View)`
  margin-top: 8%;
  height: 100%;
`;
const StyledButton = styled(Button)`
  width: 84%;
  height: 10%;
  font-size: 25px;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16%;
  justify-content: center;
  
`;
const ClickLink = styled(Text)<{ $color: string }>`
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
`;
