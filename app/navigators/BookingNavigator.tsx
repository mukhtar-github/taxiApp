import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Icon } from "../components"
import { WelcomeScreen } from "app/screens"

export type BookingNavigatorParamList = {
  Demo: undefined,
}

const Stack = createNativeStackNavigator<BookingNavigatorParamList>()
export const BookingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="Demo" component={WelcomeScreen} />
    </Stack.Navigator>
  )
}
