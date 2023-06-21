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
import { WelcomeScreen, LoginScreen, RegisterScreen, HomeScreen } from "app/screens";
import Config from "../config";



// Define the navigation stack types
type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

type HomeStackParamList = {
  Home: undefined;
};

export type AppStackParamList = {
  // 🔥 Your screens go here
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
	TermsAndConditions: undefined
	Confirmation: undefined
	Booking: undefined
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





// import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
// import { observer } from "mobx-react-lite"
// import React from "react"
// import { useColorScheme } from "react-native"
// import Config from "../config"
// import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
// import { WelcomeScreen, LoginScreen, RegisterScreen, HomeScreen } from "app/screens"
// import { useStores } from "app/models"
// import { AuthenticationStore } from "app/models"
// import { createStackNavigator } from "@react-navigation/stack";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */


// export type AppStackParamList = {
//   // 🔥 Your screens go here
//  Welcome: undefined;
//   Booking: { destination: string };
//   Login: undefined;
//   Register: undefined;
//   Home: undefined;
//   TermsAndConditions: undefined;
// 	// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
// }

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */

// export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
//   AppStackParamList,
//   T
// >

// // Documentation: https://reactnavigation.org/docs/stack-navigator/

// const Stack = createNativeStackNavigator<AppStackParamList>()

// const AppStack = observer(function AppStack() {
//   const {
//     authenticationStore: { isAuthenticated },
//   } = useStores()

//   console.log("isAuthenticated:", isAuthenticated)

//   return (
//      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? "Home" : "Welcome"} >
//       {isAuthenticated ? (
//         // Show home screen after user is authenticated
//         <Stack.Screen name="Home" component={HomeScreen} />
//       ) : (
//         // Show welcome screen as initial screen
//         <>
//           <Stack.Screen name="Welcome" component={WelcomeScreen} />
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   )
// })
