
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
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import FormImagePicker from "../components/forms/FormImagePicker";
import AppFormPicker from "../components/forms/FormPicker";
import colors from "../config/colors";
// import { db, storage } from '../config/firebase';

import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/firebase";




const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  category: Yup.string().required().label("Category"),
  className:Yup.object().required().nullable().label('Class Name'),
  projectRef: Yup.string().required().label("Project ID"),
  resolution:Yup.object().required().nullable().label('Resolution'),
  images: Yup.array().min(1, "Please select at least one image.").max(1,"You can upload maximum one photo. Tap on the photo to delete."),
});


const classNames = [
  { label: 'Web App', value: 'web', backgroundColor: 'salmon', icon: 'web' },
  { label: 'Mobile App', value: 'mobile', backgroundColor: 'royalblue', icon: 'cellphone' },
  { label: 'DM', value: 'dm', backgroundColor: 'cyan', icon: 'shopping-outline' },
  
];

const resolutions = [
  { label: '800*400', value: '800*400', backgroundColor: 'salmon', icon: 'fit-to-screen' },
  { label: '800*800', value: '800*800', backgroundColor: 'royalblue', icon: 'fit-to-screen-outline' },
  
  
];

function HomePageMidProject({navigation,route}) {
  
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPostedDone, setShowPostedDone ] = useState(false);
  const [showPostingFailed, setShowPostingFailed ] = useState(false);
  
  // const {user } = useAuth();


const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  

  // useEffect(()=>{

  //   if(user){
  //     setIsLoggedIn(true);
  //   }else{
  //     setIsLoggedIn(false);
  //   }
  // },[user])
  


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
 const {images, title, category, className, projectRef, resolution } = updatedListings;
 let newProject = { title, category, className: className.value, projectRef, resolution: resolution.value};

 
  
  const collectionName = 'homepage'
  const projectId= 'projectsOfMiddleTwo'
 

 try {
    
    const projectsDocRef = doc(db, collectionName , projectId);
    const projectsDocSnapShot = await getDoc(projectsDocRef);


    // ---------------- Project Image Start ---------------------

    if(images.length > 0){
    
    const updatedImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      
      const imagesFolderRef = ref(storage, `projects-of-middle-two-image/${projectId}/${i}`);
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
    newProject ={...newProject, img: updatedImages[0]}
    
    
    }

    // ---------------- Project Image End ---------------------



    if (projectsDocSnapShot.exists()) {
      const updatedSkillsData = arrayUnion(newProject); // Use arrayUnion to add a new element to the array

      await updateDoc(projectsDocRef, {
        projectsOfMiddleTwo: updatedSkillsData,
      });

      console.log('Skill added successfully!');
    } else {
      console.error(`Blog with ID '${projectId}' does not exist.`);
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
          title: "",
          category: "",
          className: null,
          projectRef: "",
          resolution: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        
        <FormImagePicker  name="images" />
<AppText style={{color: colors.white, padding: 5, fontSize: 15, textAlign: 'center' ,backgroundColor: colors.secondary1, borderRadius: 10, marginVertical: 10}} > Add One Photo of res: 800x400 or 800x800  </AppText>
 <FormField
            autoCorrect={false}
            icon="account"
            name="title"
            placeholder="Title"
          />

        <FormField
            autoCorrect={false}
            icon="account"
            name="category"
            placeholder="Category"
          />

            <AppFormPicker
          items={classNames}
          name='className'
          placeholder='Class Name'
          PickerItemComponent={CategoryPickerItem}
          numberOfColumns={3}
          width='50%'
        />
              
        
          <FormField
            autoCorrect={false}
            icon="pen"
            name="projectRef"
            placeholder="Project ID"
          />
         
            <AppFormPicker
          items={resolutions}
          name='resolution'
          placeholder='Resolution'
          PickerItemComponent={CategoryPickerItem}
          numberOfColumns={3}
          width='50%'
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
    padding: 10,
    position: 'relative'
  },
});
export default HomePageMidProject;
