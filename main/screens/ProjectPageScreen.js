import React from 'react';
import { StyleSheet } from 'react-native';

import { useRouter } from 'expo-router';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import routes from '../navigation/routes';




function ProjectPageScreen(props) {

const router = useRouter();

  const handleNavigate = (page) =>{
    router.push(page)
    
  }


return (
<Screen style={styles.container}>
 
 <AppText>Project Page</AppText>
  <AppButton style={{marginVerticle: 30 }}
    title='Add Project' onPress={()=>handleNavigate(routes.ADD_PROJECT_PAGE_PROJECTS.link)} />
 
</Screen>);
}

const styles = StyleSheet.create({
container: {},
});

export default ProjectPageScreen;
