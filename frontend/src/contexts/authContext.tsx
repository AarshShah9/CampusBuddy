import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { UserDataType } from "~/types/User";

const setAxiosTokenHeader = (token: string) =>
  (axios.defaults.headers.common["authToken"] = `${token}`);

const removeAxiosTokenHeader = () =>
  (axios.defaults.headers.common["authToken"] = "");

const TOKEN_KEY = "cba-secure-token";
type TOKEN_KEY_TYPE = typeof TOKEN_KEY;

const setTokenInSecureStore = async (key: TOKEN_KEY_TYPE, value: string) =>
  await SecureStore.setItemAsync(key.trim(), value);

const getTokenFromSecureStore = async (key: TOKEN_KEY_TYPE) =>
  await SecureStore.getItemAsync(key.trim());

const deleteTokenFromSecureStore = async (key: TOKEN_KEY_TYPE) =>
  await SecureStore.deleteItemAsync(key.trim());

type userRegistrationData = {
  name: string;
  email: string;
};
type authContext = {
  user: UserDataType | null;
  registerUser: (arg: userRegistrationData) => Promise<void>;
  signIn: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
};
const AuthContext = createContext<authContext | null>(null);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<UserDataType | null>({
    id: "1",
    name: "",
    email: "",
    icon: "#",
  });

  const registerUser = useCallback(async (data: userRegistrationData) => {
    try {
      const { name, email } = data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signIn = useCallback(async (email: string) => {
    try {
      let tokenFromBackend = "tokenFromBackend";
      setAxiosTokenHeader(tokenFromBackend);
      await setTokenInSecureStore(TOKEN_KEY, tokenFromBackend);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await deleteTokenFromSecureStore(TOKEN_KEY);
      removeAxiosTokenHeader();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getTokenFromSecureStore(TOKEN_KEY);
      if (token) {
        setAxiosTokenHeader(token);
      }
    };

    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, registerUser, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
