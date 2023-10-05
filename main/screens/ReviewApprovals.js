import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';



import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import listingsApi from '../api/listings';
import AppText from '../components/AppText';
import Card from '../components/Card';
import Screen from '../components/Screen';


function ReviewApprovals(props) {

  
const router = useRouter();

  const handleNavigate = (page) =>{
    router.push(page)
    
  }

  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletedDone, setDeletedDone] = useState(false);
  
  const isFocused= useIsFocused();

  

  const getProjects = async () => {
    setLoading(true);
    try {
      
      const data1 = await listingsApi.getReviewsFromFirebase()
      

      
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

return(
 <Screen>
  <AppText>Review Approvals</AppText>
  
  <FlatList
          data={data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
           <>
            <Card
              title={item.projectName}
              subTitle={item.review}
              
              
            
              
            >
<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'white', }} >
  
  
<AppText>{item.visible? 'True' : 'False' }</AppText>
              
</View>

            </Card>
            
             
             

     
           </>
          )}
        />
 </Screen>
)
}

const styles = StyleSheet.create({
container: {},
});

export default ReviewApprovals;
