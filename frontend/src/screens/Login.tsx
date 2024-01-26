import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, TextInput } from "react-native-paper";

import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { MainContainer } from "~/components/ThemedComponents";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

type loginForm = {
    email: string,
    password: string
}

export default function Login() {
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();
  
  const schema = zod.object({
    email: zod.string(),
    password: zod.string()
  });

  const { control, handleSubmit, formState: { errors } } = useForm<loginForm>({
    defaultValues: {
        email: '',
        password: ''
    },
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: loginForm) => {
    console.log(data)
    //validate()
  }

  return (
    
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <MainContainer $primary={theme.colors.primary}>
      <LogoContainer>
        <Image
          style={{ marginTop: 42 }}
          source={require("../../assets/Campus_Buddy_Logo.png")}
        />
      </LogoContainer>
      <OverlayContainer $color={theme.colors.tertiary}>
        <Header>{"Login"}</Header>
        <FormContainer>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="email"
            />
            {errors.email && <Text>Email is required.</Text>}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="password"
            />
            {errors.password && <Text>Password is required.</Text>}
            
            <StyledButton mode="contained" onPress={handleSubmit(onSubmit)}>
            <Text style={{lineHeight:30, fontSize: 24, fontWeight: "bold", color: "white", fontFamily:"Nunito-Bold"}}>
                Login
            </Text>
            </StyledButton>
            <ClickLink $color={theme.colors.primary}>
           <Text>Don't have any account? </Text>
            <Text onPress={()=>{navigation.navigate("StudentSignUp")}} style={{ color: theme.colors.primary, fontFamily:"Roboto-Reg" }}>Sign up</Text>
            </ClickLink>
        </FormContainer>
      </OverlayContainer>
    </MainContainer>
    </TouchableWithoutFeedback>
  );
}

const LogoContainer = styled(View)`
  height: 28%;
  align-items: center;
  justify-content: center;
`;
const OverlayContainer = styled(View)<{ $color: string }>`
  height: 74%;
  width: 100%;
  border-top-left-radius: 76px;
  border-width:0s;
  background-color: ${(props) => props.$color};
  justifyContent:center;
  align-item:center;
`;

const FormContainer = styled(View)`
    width: 90%;
    margin-top: 8%;
    height: 500px;
    margin-left:auto;
    margin-right:auto;
`;

const ClickLink = styled(Text)<{ $color: string }>`
  margin-left: auto;
  margin-right: auto;
  margin-top: 64px;
  font-size: 16px;
  font-family: Roboto-Reg
`;
const Header = styled(Text)`
  font-size: 40px;
  font-weight: bold;
  margin-top: 64px;
  margin-bottom: 32px;
  margin-left: auto;
  margin-right: auto;
  font-family: Nunito-Bold
`;
const InputField = styled(TextInput)`
    width: 100%;
    height: 56px;
    margin-bottom: 30px;
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
