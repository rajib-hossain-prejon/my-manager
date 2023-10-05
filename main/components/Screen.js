import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from "../config/colors";


function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
        <StatusBar style="light" />
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.dark
  },
  view: {
    flex: 1,
  },
});

export default Screen;
