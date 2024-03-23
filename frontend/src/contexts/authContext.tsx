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
  institutionId: string;
  firstName: string;
  lastName: string;
  password: string;
  rePassword?: string;
};
export type institution = {
  id: string;
  name: string;
};
export type organizationInformation = {
  orgEmail: string;
  organizationName: string;
  institutionId: string;
  description: string;
  password: string;
  rePassword: string;
};
type authContext = {
  user?: UserDataType;
  registerUser: (arg: userRegistrationData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  getInstitutions: () => Promise<any>;
  setUser: React.Dispatch<React.SetStateAction<UserDataType | undefined>>;
  registerOrganization: (arg: organizationInformation) => Promise<void>;
};
const AuthContext = createContext<authContext | null>(null);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<UserDataType>();

  const registerUser = useCallback(async (data: userRegistrationData) => {
    try {
      let res = await CBRequest("POST", "/api/user/student", { body: data });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const registerOrganization = useCallback(
    async (data: organizationInformation) => {
      try {
        // Makes call to backend to register organization
        let res = await CBRequest("POST", "/api/orgs/", { body: data });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const res = await CBRequest("GET", "/api/user/token", {}); // TODO - implement this with proper login
      setAxiosTokenHeader(res.authToken as string);
      await setTokenInSecureStore(TOKEN_KEY, res.authToken as string);
      setUser(res.data);
    } catch (error) {
      console.log("An error occured while trying to sign in:\n", error);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await deleteTokenFromSecureStore(TOKEN_KEY);
      removeAxiosTokenHeader();
      setUser(undefined);
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
      value={{
        user,
        registerUser,
        signIn,
        logOut,
        getInstitutions,
        registerOrganization,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
