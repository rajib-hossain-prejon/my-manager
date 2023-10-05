
// import { addDoc, collection, updateDoc } from 'firebase/firestore';
import React, { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  SubmitButton
} from "../components/forms";

// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import useAuth from '../auth/useAuth';
import AppActivityIndicator from '../components/AppActivityIndicator';
import AppAlertToast from '../components/AppAlertToast';
import AppScrollView from "../components/AppScrollView";
import Screen from "../components/Screen";
import colors from "../config/colors";
// import { db, storage } from '../config/firebase';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";




const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  projectName: Yup.string().required().label("Project Name"),
  projectLink: Yup.string().required().label("Project Link"),
 
});


function AddClientsProject({navigation,route}) {
  
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

  console.log(" Listings:  ", listings)
  setLoading(true);
  let updatedListings = { ...listings };
  

  const { email, password, projectName, projectLink } = updatedListings;

  try {
const userCredential = await createUserWithEmailAndPassword(auth, email, password)
 const user = userCredential.user;
    const userUID = user.uid;
    
    const docRef = doc(db, 'project-hub', userUID);
   
    const docSnap = await setDoc(docRef, { projectName, projectLink });

   
    

  setLoading(false);
  setShowPostedDone(true);
  setTimeout(()=>{
    setShowPostedDone(false);
  },1500)
  resetForm()
  
  } catch (error) {
    setLoading(false);
    Alert.alert(error.message);
    

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
          email: "",
          password:"",
          projectName:"",
          projectLink:"",
          
        
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
         
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
          
      
        <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="projectName"
          
          placeholder="Project Name"
        />
         <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="projectLink"
          
          placeholder="projectLink"
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
export default AddClientsProject;
