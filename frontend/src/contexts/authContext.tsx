import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { OrganizationDataType, UserDataType, UserType } from "~/types/User";
import { CBRequest } from "~/lib/CBRequest";
import { Alert } from "react-native";

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
  confirmPassword?: string;
};
export type institution = {
  id: string;
  name: string;
};
export type organizationInformation = {
  orgEmail: string;
  organizationName: string;
  firstName: string;
  lastName: string;
  institutionId: string;
  description: string;
  password: string;
  confirmPassword?: string;
};

type authContext = {
  user?: UserDataType;
  organization?: OrganizationDataType;
  userType?: UserType;
  registerUser: (arg: userRegistrationData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean | undefined>;
  logOut: () => Promise<void>;
  getInstitutions: () => Promise<any>;
  setUser: React.Dispatch<React.SetStateAction<UserDataType | undefined>>;
  setOrganization: React.Dispatch<
    React.SetStateAction<OrganizationDataType | undefined>
  >;
  registerOrganization: (arg: organizationInformation) => Promise<void>;
  isUserLoggedIn: () => Promise<boolean>;
};
const AuthContext = createContext<authContext | null>(null);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [userType, setUserType] = useState<UserType>();
  const [user, setUser] = useState<UserDataType>();
  const [organzationalUser, setOrganizationalUser] =
    useState<OrganizationDataType>();

  const registerUser = useCallback(async (data: userRegistrationData) => {
    try {
      await CBRequest("POST", "/api/user/student", { body: data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const registerOrganization = useCallback(
    async (data: organizationInformation) => {
      try {
        // Makes call to backend to register organization
        let res = await CBRequest("POST", "/api/user/organization/new", {
          body: {
            organization: {
              organizationName: data.organizationName,
              description: data.description,
              institutionId: data.institutionId,
            },

            user: {
              institutionId: data.institutionId,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.orgEmail,
              password: data.password,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      // Actual login
      const loginRes = await CBRequest("POST", "/api/user/loginUser", {
        body: {
          email,
          password,
        },
      });
      setAxiosTokenHeader(loginRes.authToken as string);
      await setTokenInSecureStore(TOKEN_KEY, loginRes.authToken as string);

      if (loginRes.data.type === "Organization_Admin") {
        setUserType("Organization_Admin");
        setOrganizationalUser(loginRes.data);
      } else if (loginRes.data.type === "Student") {
        setUserType("Student");
        setUser(loginRes.data);
      } else {
        Alert.alert("Error Logging In", "Something went wrong!");
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert("Error Logging In", "Something went wrong!");
      return false;
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await deleteTokenFromSecureStore(TOKEN_KEY);
      removeAxiosTokenHeader();
      setUser(undefined);
      setOrganizationalUser(undefined);
      setUserType(undefined);
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

  const isUserLoggedIn = useCallback(async () => {
    try {
      const token = await getTokenFromSecureStore(TOKEN_KEY);
      setAxiosTokenHeader(token as string);
      if (token) {
        const loginRes = await CBRequest("GET", "/api/user/verify");
        if (loginRes.data.type === "Organization_Admin") {
          setUserType("Organization_Admin");
          setOrganizationalUser(loginRes.data);
          return true;
        } else if (loginRes.data.type === "Student") {
          setUserType("Student");
          setUser(loginRes.data);
          return true;
        } else {
          Alert.alert("Error Logging In", "Something went wrong!");
          return false;
        }
      }
      return false;
    } catch (error) {
      // remove the token from the secure store
      await deleteTokenFromSecureStore(TOKEN_KEY);
      removeAxiosTokenHeader();
      console.log("Pre-existing login failed", error);
      return false;
    }
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
        userType,
        organization: organzationalUser,
        setOrganization: setOrganizationalUser,
        isUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
