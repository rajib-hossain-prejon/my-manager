// import client from "./client";


import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../config/firebase";

const missingPersonsCollectionRef = collection(db, 'missing-persons')




const getListingsFromFirebase = async() =>{

const data1 = await getDocs(missingPersonsCollectionRef)
const filteredData = data1.docs.map((doc) => ({...doc.data(), id: doc.id}) )

return filteredData;
}

const getMyListingsFromFirebase = async (currentUserID) => {
  const q = query(missingPersonsCollectionRef, where("userId", "==", currentUserID));

  const querySnapshot = await getDocs(q);

  const filteredData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return filteredData;
};








const getListingsFromFirebaseBySearch = async (searchText) => {

const data1 = await getDocs(missingPersonsCollectionRef)
const filteredData = data1.docs.map((doc) => ({...doc.data(), id: doc.id}) )


 const results = filteredData.filter((person) =>
      person.name.toLowerCase().includes(searchText.toLowerCase())
    );

return results;
};














export default {
  getListingsFromFirebase, getMyListingsFromFirebase, getListingsFromFirebaseBySearch
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


