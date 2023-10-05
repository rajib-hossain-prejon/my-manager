import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
import colors from '../config/colors';


import { useRouter } from 'expo-router';
import routes from '../navigation/routes';


function HomeScreen() {

  const router = useRouter();

  const handleNavigate = (page) =>{
    router.push(page)
    
  }

  return (
    
      
      <Screen>
        <View style={styles.container}>
        
        <AppButton style={{marginVerticle: 30 }} title='Projects' onPress={()=>handleNavigate(routes.PROJECTS.link)} />
       
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
    alignItems: 'center'
  },
});

export default HomeScreen;
