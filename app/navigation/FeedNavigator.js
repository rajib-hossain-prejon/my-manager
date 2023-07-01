import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import ListingsScreen from "../screens/ListingsScreen";
import navigationTheme from "./navigationTheme";
import routes from "./routes";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator  screenOptions={{
        headerStyle: {
          backgroundColor: navigationTheme.colors.headerBackground,
        },
        headerTintColor: navigationTheme.colors.headerText,
      }} >

<Stack.Screen name={routes.HOME} component={HomeScreen} options={{
      headerTitle: 'Apps and Websites',
    }} />

    <Stack.Screen name={routes.LISTINGS} component={ListingsScreen} options={{
      headerTitle: 'Project Details',
    }} />

<Stack.Screen name={routes.LISTING_EDIT} component={ListingEditScreen} options={{
      headerTitle: 'Add Data',
    }} />

    <Stack.Screen name={routes.LISTING_DETAILS} component={ListingDetailsScreen} options={{
      headerTitle: 'Data Details',
    }} />
  </Stack.Navigator>
);

export default FeedNavigator;
