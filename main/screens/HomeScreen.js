import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppLink from '../components/AppLink';
import AppText from '../components/AppText';
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
        <AppText>Website Name: <AppText style={{color: colors.bootstrap_success}}>Rajib Hossain Prejon</AppText></AppText>

        
        
 <AppText>
  Website Link: <AppLink url="https://rajibhossainprejon.com">
        rajibhossainprejon.com
      </AppLink>   
 </AppText>
        <AppButton style={{marginVerticle: 30 }} title='Pages' onPress={()=>handleNavigate(routes.PAGES.link)} />
        <AppButton style={{marginVerticle: 30 }} title='Show Datas' onPress={()=>handleNavigate(routes.SHOW_DATAS.link)} />
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
