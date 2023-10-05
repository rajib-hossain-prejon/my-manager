import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import Screen from '../components/Screen';
import colors from '../config/colors';


import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import listingsApi from '../api/listings';
import AppText from '../components/AppText';


function Projects() {
 const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletedDone, setDeletedDone] = useState(false);
  
  const isFocused= useIsFocused();

  const router = useRouter();

  const getProjects = async () => {
    setLoading(true);
    try {
      
      const data1 = await listingsApi.getListingsFromFirebase();
      

      
      setData(data1);
      

      
    } catch (error) {
      console.log('Failed: ', error.message);
      setError(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProjects();
  }, [isFocused]);

  const handleNavigate = (page) =>{
    router.push(page)
  }


  

  return (
    
      
      <Screen>
      <View style={styles.container}>
        
        <AppText>Projects</AppText>
        <FlatList
          data={data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
    <>
            <Card
              title={item.title}
              subTitle={item.id}
              
            
              
            >
<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'white', }} >
  
  
    
              
</View>

            </Card>
            
             
             

     
           </>
          )}
        />
       
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
