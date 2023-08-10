import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./AddPost.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [photo, setPhoto] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [claimed, setClaimed] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  const handleClaimedChange = (event) => {
    setClaimed(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (photo) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${photo.name}`);
        await uploadBytes(storageRef, photo);

        // Get download URL
        const photoUrl = await getDownloadURL(storageRef);

        // Create a new post in Firestore
        const firestore = getFirestore();
        await addDoc(collection(firestore, "Post"), {
          title,
          details,
          photoUrl,
          pickupLocation,
          claimed,
        })
          .then(() => {
            console.log("Post added successfully!");
          })
          .catch((error) => {
            console.error("Error adding post:", error);
          });

        // Reset form fields
        setTitle("");
        setDetails("");
        setPhoto(null);
        setPickupLocation("");
        setClaimed(false);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            value={details}
            onChange={handleDetailsChange}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <div>
          <label htmlFor="pickup-location">Pickup Location:</label>
          <input
            type="text"
            id="pickup-location"
            value={pickupLocation}
            onChange={handlePickupLocationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="claimed">Claimed:</label>
          <input
            type="checkbox"
            id="claimed"
            checked={claimed}
            onChange={handleClaimedChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;
