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

type userRegistrationData = {
  name: string;
  email: string;
};
export type institution = {
  id: string;
  orgName: string;
  institution: string;
  description: string;
  password:string;

};
type authContext = {
  user: UserDataType | null;
  registerUser: (arg: userRegistrationData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  getInstitutions: () => Promise<any>;
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

  const registerOrganization = useCallback(async (data: institution) => {
    try {
      const { orgName, institution } = data;
    } catch (error) {
      console.log(error);
    }
  },[])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const jwt = await CBRequest("GET", "/api/user/token", {}); // TODO - implement this with proper login
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

  const getInstitutions = useCallback(async () => {
    try {
      return await CBRequest("GET", "/api/institution/getAllInstitutions", {});
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
    <AuthContext.Provider
      value={{ user, registerUser, signIn, logOut, getInstitutions }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
