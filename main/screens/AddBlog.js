

import React, { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  SubmitButton
} from "../components/forms";

// import useAuth from '../auth/useAuth';

import AppActivityIndicator from '../components/AppActivityIndicator';
import AppAlertToast from '../components/AppAlertToast';
import AppScrollView from "../components/AppScrollView";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import colors from "../config/colors";

//Firebase
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import AppText from "../components/AppText";
import { db, storage } from '../config/firebase';




const validationSchema = Yup.object().shape({
  alt: Yup.string().label("alt"),
  description: Yup.string().required().label("Description"),
  title: Yup.string().required().label("Title"),
  quote: Yup.string().label("Quote"),
  images: Yup.array().min(0, "Image is not required").max(1,"You can upload maximum 1 photo. Tap on the photo to delete."),
});



function ListingEditScreen({navigation,route}) {
  
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


const blogsCollectionRef = collection(db, 'blogs');
const handleSubmit = async (listings, { resetForm }) => {

  
  setLoading(true);
  let updatedListings = { ...listings };
  

  const { alt, description, title, quote , images } = updatedListings;

  try {
    const blogDocRef = await addDoc(blogsCollectionRef, {
    alt,
    description,
    title,
    quote, 
    
    });

    if(images.length > 0){
      const docId = blogDocRef.id;
    const updatedImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      
      const imagesFolderRef = ref(storage, `blogs-image/${docId}/${i}`);
      const imageBlob = await getBlobFroUri(image);
      const metadata = {
        contentType: 'image/jpeg'
      };
      
      const uploadTask = uploadBytesResumable(imagesFolderRef, imageBlob, metadata);
      const snapshot = await uploadTask;

      // Get the download URL of the uploaded image
      
      const downloadURL = await getDownloadURL(imagesFolderRef);

      updatedImages.push(downloadURL); // Add the download URL to the updatedImages array
    }

    // // Update the document with the updatedImages array
    
    await updateDoc(blogDocRef, {
      image: updatedImages[0]
    }
    );
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
          alt:"",
          description:"",
          
          quote:"",
title:"",
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >


         <AppText>
          1000x560 px image

        </AppText>

        <FormImagePicker name="images" />
        <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="alt"
          
          placeholder="Alt"
        />
         
          
      
        <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="description"
          
          placeholder="Description"
        />
         <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="quote"
          
          placeholder="Quote"
        />

 <FormField
          maxLength={4000}
          icon='pen'
          multiline
          name="title"
          
          placeholder="Title"
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
export default ListingEditScreen;
