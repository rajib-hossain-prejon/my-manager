import React from 'react';
import { StyleSheet } from 'react-native';

import { useRouter } from 'expo-router';

import AppText from '../components/AppText';
import AppButton from '../components/Button';
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';




function HomePageAddProject(props) {

  const router = useRouter();

  const handleNavigate = (page) =>{
    router.push(page)
    
  }

  const buttonData = [
  { route: routes.ADD_MID_PROJECT, color: colors.bootstrap_success },
  { route: routes.ADD_LOWER_PROJECT, color: colors.secondary },
  
 
];

return(
 <Screen>
  <AppText>Add Homepage Projects</AppText>
  
  {buttonData.map((button, index) => (
            <AppButton
              key={index}
              style={[styles.appButton, { backgroundColor: button.color }]}
              title={button.route.header}
              
              onPress={() => handleNavigate(button.route.link)}
            />
          ))}
 </Screen>
)
}

const styles = StyleSheet.create({
container: {},
});

export default HomePageAddProject;
