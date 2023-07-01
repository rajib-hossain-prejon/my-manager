import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import FeedNavigator from './app/navigation/FeedNavigator';

export default function App() {
  return (
    <NavigationContainer>
    
      <FeedNavigator/>
      
      
    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
