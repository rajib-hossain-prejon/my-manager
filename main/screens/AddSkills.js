

import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  SubmitButton
} from "../components/forms";



import AppActivityIndicator from '../components/AppActivityIndicator';
import AppAlertToast from '../components/AppAlertToast';
import AppScrollView from "../components/AppScrollView";
import Screen from "../components/Screen";
import colors from "../config/colors";


//Firebase
import { arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import AppText from "../components/AppText";
import { db } from '../config/firebase';




const validationSchema = Yup.object().shape({
  img: Yup.string().required().label("Image Link"),
  title: Yup.string().required().label("Title"),
 
});


function AddSkills({navigation,route}) {
  
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPostedDone, setShowPostedDone ] = useState(false);
  const [showPostingFailed, setShowPostingFailed ] = useState(false);
  
  


const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  

  
  


const aboutPageRef = collection(db, 'aboutPage');



const handleSubmit = async (listings, { resetForm }) => {

  console.log(" Listings:  ", listings)
  setLoading(true);
  let newSkill = { ...listings, percantage: '100' };
  

  const skillId= 'skills'
 

 try {
    
    const skillDocRef = doc(db, 'aboutpage', skillId);
    const skillDocSnapshot = await getDoc(skillDocRef);

    if (skillDocSnapshot.exists()) {
      const updatedSkillsData = arrayUnion(newSkill); // Use arrayUnion to add a new element to the array

      await updateDoc(skillDocRef, {
        skillsData: updatedSkillsData,
      });

      console.log('Skill added successfully!');
    } else {
      console.error(`Blog with ID '${skillId}' does not exist.`);
    }
    
    
  resetForm();
  setLoading(false);
  setShowPostedDone(true);
  setTimeout(()=>{
    setShowPostedDone(false);
  },1500)
  // navigation.goBack();
  
  } catch (error) {
    setLoading(false);
    
    Alert.alert(error);
    console.log(error)

    setShowPostingFailed(true);
    setTimeout(()=>{
      setShowPostingFailed(false)
    },1500)

    
    
  }
setLoading(false);
  
};



// if (!isLoggedIn){
//   return < >
  
//  <AppBanner
//   description="To Add Your Missing Person Information Please Login First"
//   buttonText="Login"
//   onPress={()=>navigation.navigate('Account',{screen: routes.LOGIN})}
//  />
//   </>
// }

  return (
<>
    <AppActivityIndicator visible={loading} />
    <AppAlertToast visible={showPostedDone} success={true} message="Successfully Posted"  />
    <AppAlertToast visible={showPostingFailed} failed={true}   message={
            <Text>
            <Text style={{ lineHeight: 24 }}>Posting failed.</Text>
            {'\n'}
            <Text style={{ lineHeight: 24 }}>Please try again!</Text>
          </Text>
        } />
    
    
  <AppScrollView>
   

      
      
      <Screen style={styles.container}>
  
      <Form
        initialValues={{
       
          img:"",
          title:"",
          
        
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        
        
       
         <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="title"
          
          placeholder="Title"
        />  

         <AppText>
          Visit: https://icons8.com/ for icon {'\n'}
        1: Search Icon{'\n'}
       2: Click Icon  {'\n'}
       3: Click Download {'\n'}
       4: Go to Link(CDN){'\n'}
       5: Copy the Link

        </AppText>
      
        <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="img"
          
          placeholder="Image Link"
        />
        

 
        
        <SubmitButton title="Post" />
      </Form>
      
    </Screen>
  
    </AppScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 10,
    position: 'relative'
  },
});
export default AddSkills;
