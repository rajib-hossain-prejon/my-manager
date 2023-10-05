// import client from "./client";


import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";

const projectsCollectionRef = collection(db, 'projects')
const reviewsCollectionRef = collection(db, 'reviews')





const getListingsFromFirebase = async() =>{

const data1 = await getDocs(projectsCollectionRef)
const filteredData = data1.docs.map((doc) => ({...doc.data(), id: doc.id}) )

return filteredData;
}

const getReviewsFromFirebase = async() =>{

const data1 = await getDocs(reviewsCollectionRef)
const filteredData = data1.docs.map((doc) => ({...doc.data(), id: doc.id}) )

return filteredData;
}

























export default {
  getListingsFromFirebase, getReviewsFromFirebase 
}



// const getListings = () => client.get(endpoint);
//const endpoint = "/listings";
// export const addListing = (listing, onUploadProgress) => {
//   const data = new FormData();
//   data.append("title", listing.title);
//   data.append("price", listing.price);
//   data.append("categoryId", listing.category.value);
//   data.append("description", listing.description);

//   listing.images.forEach((image, index) =>
//     data.append("images", {
//       name: "image" + index,
//       type: "image/jpeg",
//       uri: image,
//     })
//   );

//   if (listing.location)
//     data.append("location", JSON.stringify(listing.location));

//   return client.post(endpoint, data, {
//     onUploadProgress: (progress) =>
//       onUploadProgress(progress.loaded / progress.total),
//   });
// };

// export default {
//   addListing,
//   getListings,
// };


