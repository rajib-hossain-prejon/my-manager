
// import { addDoc, collection, updateDoc } from 'firebase/firestore';
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  SubmitButton
} from "../components/forms";

// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import useAuth from '../auth/useAuth';
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import AppActivityIndicator from '../components/AppActivityIndicator';
import AppAlertToast from '../components/AppAlertToast';
import AppScrollView from "../components/AppScrollView";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { db } from "../config/firebase";
// import { db, storage } from '../config/firebase';




const validationSchema = Yup.object().shape({
  icon: Yup.string().required().label("Icon"),
  title: Yup.string().required().label("Title"),
  description: Yup.string().required().label("Description"),
 
});


function AddSkills({navigation,route}) {
  
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPostedDone, setShowPostedDone ] = useState(false);
  const [showPostingFailed, setShowPostingFailed ] = useState(false);
  
  


const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  

  
  


const getBlobFroUri = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};



const handleSubmit = async (listings, { resetForm }) => {

  
  setLoading(true);
  
  
let newSkill = { ...listings };
  
  const collectionName = 'services'
  const skillId= 'BpGnTuD4TbNmwNYAQoga'
 

 try {
    
    const skillDocRef = doc(db, collectionName , skillId);
    const skillDocSnapshot = await getDoc(skillDocRef);

    if (skillDocSnapshot.exists()) {
      const updatedSkillsData = arrayUnion(newSkill); // Use arrayUnion to add a new element to the array

      await updateDoc(skillDocRef, {
        services: updatedSkillsData,
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
       
          icon:"",
          title:"",
          description:"",
          
        
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppText>
          Visit: https://themes-pixeden.com/font-demos/7-stroke/ for icon {'\n'}
          example: pe-7s-global
        </AppText>
         <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="icon"
          placeholder="Icon"
        />
       
         <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="title"
          placeholder="Title"
        />  
      
       

        <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="description"
          placeholder="Description"
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
