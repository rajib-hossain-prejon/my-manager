import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';

import { useRouter } from 'expo-router';
import AppButton from '../components/AppButton';

const buttonData = [
  { route: routes.PROJECT_PAGE, color: colors.bootstrap_success },
  { route: routes.HOME_PAGE, color: colors.secondary },
  { route: routes.ABOUT_PAGE, color: colors.secondary1 },
  { route: routes.BLOG_PAGE, color: colors.warning },
  { route: routes.CLIENTS_PROJECT, color: colors.primary },
];

function PagesScreen() {
  const router = useRouter();

  const handleNavigate = (page) => {
    router.push(page);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <AppText>PageList</AppText>
        <View style={styles.buttonContainer}>
          {buttonData.map((button, index) => (
            <AppButton
              key={index}
              style={[styles.appButton, { backgroundColor: button.color }]}
              title={button.route.header}
              onPress={() => handleNavigate(button.route.link)}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  appButton: {
    width: 260,
    marginBottom: 10,
  },
});

export default PagesScreen;
