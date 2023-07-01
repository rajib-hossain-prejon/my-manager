import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import routes from '../navigation/routes';

function HomeScreen({navigation}) {
  return (
    <>
      
      <View style={styles.container}>
        <AppText>HomePage</AppText>
        <AppButton title='Go to Project Details' onPress={()=>navigation.navigate(routes.APP_DETAILS)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
