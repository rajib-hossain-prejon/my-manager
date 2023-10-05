import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import routes from '../navigation/routes';



function BlogPageScreen(props) {

 const router = useRouter();

  const handleNavigate = (page) =>{
    router.push(page)
    
  }

return (
<Screen style={styles.container}>
 
 <AppText>Blog Page</AppText>

<AppButton style={{marginVerticle: 30 }}
    title={routes.ADD_BLOG.header} onPress={()=>handleNavigate(routes.ADD_BLOG.link)} />

</Screen>);
}

const styles = StyleSheet.create({
container: {},
});

export default BlogPageScreen;
