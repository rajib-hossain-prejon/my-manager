import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import routes from '../navigation/routes';




function ClientsProject(props) {

 const router = useRouter();

  const handleNavigate = (page) =>{
    router.push(page)
    
  }
return (
<Screen style={styles.container}>
 
 <AppText>Clients Project</AppText>
 <AppButton style={{marginVerticle: 30 }}
    title={routes.ADD_CLIENTS_PROJECT.header} onPress={()=>handleNavigate(routes.ADD_CLIENTS_PROJECT.link)} />
</Screen>);
}

const styles = StyleSheet.create({
container: {},
});

export default ClientsProject;
