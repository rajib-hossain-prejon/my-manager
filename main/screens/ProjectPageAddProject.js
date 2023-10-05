
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
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AppActivityIndicator from '../components/AppActivityIndicator';
import AppAlertToast from '../components/AppAlertToast';
import AppScrollView from "../components/AppScrollView";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import FormImagePicker from "../components/forms/FormImagePicker";
import FormListInput from "../components/forms/FormListInput";
import AppFormPicker from "../components/forms/FormPicker";
import colors from "../config/colors";
import { db, storage } from "../config/firebase";
// import { db, storage } from '../config/firebase';




const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  subTitle: Yup.string().required().label("Subtitle"),
  category: Yup.string().required().label("Category"),
  className:Yup.object().required().nullable().label('Class Name'),
  
  images: Yup.array().min(1, "Please select at least one image.").max(1,"You can upload maximum one photo. Tap on the photo to delete."),
  imagesForHeader: Yup.array().min(0, "No Image Needed!").max(1,"You can upload maximum one photo. Tap on the photo to delete."),
  imagesForGallery: Yup.array().min(4, "Please select at least Four images.").max(4,"You can upload maximum Four photos. Tap on the photo to delete."),
  categories: Yup.array().min(1,"At least One Category Needed"),
  clientURLName: Yup.string().required().label("Clients Name"),
  date: Yup.string().required().label("Date"),
  descriptionContent: Yup.string().required().label("Content of Description"),
 

  introContent: Yup.string().required().label("Intro Content"),
  technologies: Yup.array().min(1,"At least One Technology"),
  
});


const classNames = [
  { label: 'Web App', value: 'web', backgroundColor: 'salmon', icon: 'web' },
  { label: 'Mobile App', value: 'mobile', backgroundColor: 'royalblue', icon: 'cellphone'},
  { label: 'DM', value: 'dm', backgroundColor: 'cyan', icon: 'shopping-outline' },
  
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


const addLinkToObjects = (array) => {
  return array.map(item => ({ ...item, link: '#' }));
};

const projectsCollectionRef = collection(db, 'projects');



const handleSubmit = async (listings, { resetForm }) => {

  console.log(" Listings:  ", listings)
  setLoading(true);
  let updatedListings = { ...listings };
  

  const { 
          title,
          subTitle,
          alt,
          category,
          categories,
          className,
          clientURLName,
          clientURLLink,
          date,
          descriptionContent,
          descriptionSpmList,
          introContent,
          introSpmList,
          technologies,
          imagesForHeader,
          imagesForGallery,
          images
          
  } = updatedListings;



   const updatedCategories = addLinkToObjects(categories);

   
    const updatedTechnologies = addLinkToObjects(technologies)


  const newProject = {  
          title,
          subTitle,
          categories: updatedCategories,
          category,
          className: className.value,
          clientURLName,
          clientURLLink,
          date,
          description: {content: descriptionContent, spmList: descriptionSpmList},
          intro: {content: introContent, spmList: introSpmList},
          technologies: updatedTechnologies,
          videoLink: "https://vimeo.com/127203262"
        }

// images: [],
//           imagesForHeader: [],
//           imagesForGallery: [],
//           categories:[],
//   descriptionSpmList: [],
//   introSpmList: [],
//           technologies: [],
  

  try {
    const projectDocRef = await addDoc(projectsCollectionRef, {
    ...newProject
    
    });

    if(images.length > 0){
    const docId = projectDocRef.id;
    const updatedImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      
      const imagesFolderRef = ref(storage, `projects-page-image/${docId}/cover/${i}`);
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
    
    await updateDoc(projectDocRef, {
      imageProjectPageCover: {src: updatedImages[0], alt}
    }
    );
    }

    //Images For Header

    if(imagesForHeader.length > 0){
      const docId = projectDocRef.id;
    const updatedImages = [];

    for (let i = 0; i < imagesForHeader.length; i++) {
      const image = imagesForHeader[i];
      
      
      const imagesFolderRef = ref(storage, `projects-page-image/${docId}/Project-Header/${i}`);
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
    
    await updateDoc(projectDocRef, {
      imageProjectDetailsHeader: {src: updatedImages[0], alt}
    }
    );
    }

    //Images For Gallery

    if(imagesForGallery.length > 0){
      const docId = projectDocRef.id;
    const updatedImages = [];

    for (let i = 0; i < imagesForGallery.length; i++) {
      const image = imagesForGallery[i];
      
      
      const imagesFolderRef = ref(storage, `projects-page-image/${docId}/gallery/${i}`);
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
    
    await updateDoc(projectDocRef, {
      imagesGallery: {imageOne: {src: updatedImages[0], alt}, imageTwo: {src: updatedImages[1], alt}, imageThree: {src: updatedImages[2], alt}, imageFour: {src: updatedImages[3], alt}}
    }
    );
    }
    
    
  // resetForm();
  setLoading(false);
  setShowPostedDone(true);
  setTimeout(()=>{
    setShowPostedDone(false);
  },1500)
  // navigation.goBack();
  
  }  catch (error) {
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

          title: "",
          category: "",
          alt: "",
          className: null,
          images: [],
          imagesForHeader: [],
          imagesForGallery: [],
          categories:[],
          clientURLName: "",
          clientURLLink: "",
          date: "",
          descriptionContent: "",
          descriptionSpmList: [],
          introContent: "",
          introSpmList: [],
          subTitle: "",
          technologies: [],
          
          
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        
        <FormImagePicker  name="images" />
        <AppText style={styles.banner} > Add One Photo of res: 800x1000  </AppText>
        <FormImagePicker  name="imagesForHeader" />
        <AppText style={styles.banner} > Add One Photo of res: 5184x3456(Optional)  </AppText>
        <FormImagePicker  name="imagesForGallery" />
<AppText style={styles.banner} > Add 4 Photos of res: 600x600  </AppText>
 <FormField
            autoCorrect={false}
            icon="account"
            name="title"
            placeholder="Title"
          />

          <FormField
            autoCorrect={false}
            icon="account"
            name="subTitle"
            placeholder="Sub Title"
          />

        <FormField
            autoCorrect={false}
            icon="account"
            name="category"
            placeholder="Category"
          />
        <FormField
            autoCorrect={false}
            icon="account"
            name="alt"
            placeholder="Alt"
          />

            <AppFormPicker
          items={classNames}
          name='className'
          placeholder='Class Name'
          PickerItemComponent={CategoryPickerItem}
          numberOfColumns={3}
          width='50%'
        />

        <AppText style={styles.banner} > Categories </AppText>

        <FormListInput
  name="categories"
  buttonTitle="Add Categories"
  itemProps={{ title: { placeholder: "Title" } }}
/>

<FormField
            autoCorrect={false}
            icon="account"
            name="clientURLName"
            placeholder="Clent Name"
          />

<FormField
            autoCorrect={false}
            icon="account"
            name="clientURLLink"
            placeholder="Client URL Link"
          />

          <FormField
            autoCorrect={false}
            icon="account"
            name="date"
            placeholder="Date"
          />
          <FormField
            autoCorrect={false}
            icon="account"
            name="descriptionContent"
            placeholder="Description Content"
          />
          <FormListInput
  name="descriptionSpmList"
  buttonTitle="Add description Spm"
  itemProps={{ title: { placeholder: "Title" } }}
/>

<FormField
            autoCorrect={false}
            icon="account"
            name="introContent"
            placeholder="Intro Content"
          />

<FormListInput
  name="introSpmList"
  buttonTitle="Add intro spm"
  itemProps={{ title: { placeholder: "Title" } }}
/>

<FormListInput
  name="technologies"
  buttonTitle="Add technologies"
  itemProps={{ title: { placeholder: "Title" } }}
/>




        
       
          
       
        <SubmitButton title="Post" />
      </Form>
      
    </Screen>
  
    </AppScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    color: colors.white,
    padding: 5,
    fontSize: 15,
    textAlign: 'center' ,
    backgroundColor: colors.secondary1,     
    borderRadius: 10,
    marginVertical: 10
  },
    
  container: { 
    padding: 10,
    position: 'relative'
  },
});
export default HomePageMidProject;
