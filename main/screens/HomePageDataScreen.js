import React from 'react';

import { useRouter } from 'expo-router';

import { StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';




function HomePageDataScreen(props) {

 const router = useRouter();

  const handleNavigate = (page) =>{
    router.push(page)
    
  }

  const buttonData = [
  { route: routes.ADD_HOMEPAGE_PROJECTS, color: colors.bootstrap_success },
  { route: routes.ADD_SERVICES, color: colors.secondary },
  { route: routes.REVIEW_APPROVALLS, color: colors.secondary1 },
 
];

return (
<Screen style={styles.container}>
 
 <AppText>Add Home Page Datas</AppText>
  {buttonData.map((button, index) => (
            <AppButton
              key={index}
              style={[styles.appButton, { backgroundColor: button.color }]}
              title={button.route.header}
              onPress={() => handleNavigate(button.route.link)}
            />
          ))}
          
</Screen>);
}

const styles = StyleSheet.create({
container: {},
});

export default HomePageDataScreen;
