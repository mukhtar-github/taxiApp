/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import { WelcomeScreen, LoginScreen, RegisterScreen, HomeScreen, ConfirmationScreen } from "app/screens";
import Config from "../config";

// Define the navigation stack types
type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

type HomeStackParamList = {
  Home: undefined;
  Confirmation: undefined;
};

export type AppStackParamList = {
  // 🔥 Your screens go here
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
	TermsAndConditions: undefined
	Confirmation: undefined
	// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>

// Create the navigation stacks
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// Create the navigation component
export const AppStack = observer(() => {
  // Get the authentication store from the root store
  const { authenticationStore } = useStores();
  // Check if the user is authenticated or not
  const isAuthenticated = authenticationStore.isAuthenticated;

  return (
    <>
     {isAuthenticated ? ( // If the user is authenticated, show the home stack*
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Confirmation" component={ConfirmationScreen} />
      </HomeStack.Navigator> ) : ( // If the user is not authenticated, show the auth stack
      <AuthStack.Navigator>
        <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
      )}
    </>
  );
});

const exitRoutes = Config.exitRoutes
export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
})
