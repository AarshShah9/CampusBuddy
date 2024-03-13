import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { UserDataType } from "~/types/User";
import { CBRequest } from "~/lib/CBRequest";

const setAxiosTokenHeader = (token: string) =>
  (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
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

export type userRegistrationData = {
  email: string;
  username:string;
  institutionName: string;
  firstName: string;
  lastName: string;
  password: string;
};
type authContext = {
  user: UserDataType | null;
  registerUser: (arg: userRegistrationData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
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
      const {institutionName, username, firstName, lastName, email, password } = data;
      let res = await CBRequest('POST', "/api/user/student",{body:data})
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const jwt = await CBRequest("GET", "/api/user/token", {}); // TODO - implement this with proper login
      console.log("Bitch here" + jwt.authToken);
      setAxiosTokenHeader(jwt.authToken as string);
      await setTokenInSecureStore(TOKEN_KEY, jwt.authToken as string);
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
