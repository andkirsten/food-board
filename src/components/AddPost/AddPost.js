import React, { useRef } from "react";
import { firestore } from "../../Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./AddPost.css";

const AddPost = () => {
  const titleRef = useRef(null);
  const detailsRef = useRef(null);
  const foodTypeRef = useRef("produce");
  const photoRef = useRef(null);
  const pickupLocationRef = useRef(null);
  const claimedRef = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const title = titleRef.current.value;
      const details = detailsRef.current.value;
      const foodType = foodTypeRef.current.value;
      const photo = photoRef.current.files[0];
      const pickupLocation = pickupLocationRef.current.value;
      const claimed = claimedRef.current.checked;
      const date = new Date().toISOString();
      const owner = "test-user";

      if (photo) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${photo.name}`);
        await uploadBytes(storageRef, photo);

        const photoUrl = await getDownloadURL(storageRef);

        await addDoc(collection(firestore, "Post"), {
          title,
          details,
          foodType,
          photoUrl,
          pickupLocation,
          claimed,
          date,
          owner,
        });

        titleRef.current.value = "";
        detailsRef.current.value = "";
        foodTypeRef.current.value = "produce";
        photoRef.current.value = null;
        pickupLocationRef.current.value = "";
        claimedRef.current.checked = false;

        console.log("Post added successfully!");
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
          <input type="text" id="title" ref={titleRef} required />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <textarea id="details" ref={detailsRef} required />
        </div>
        <div>
          <label htmlFor="food-type">Food Type:</label>
          <select name="food-type" id="food-type" ref={foodTypeRef} required>
            <option value="produce">Produce</option>
            <option value="meat">Meat</option>
            <option value="canned">Canned Goods</option>
            <option value="pantry">Pantry Staples: flour, sugar, etc.</option>
            <option value="baby">Baby Food or Formula</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" accept="image/*" ref={photoRef} />
        </div>
        <div>
          <label htmlFor="pickup-location">Pickup Location:</label>
          <input
            type="text"
            id="pickup-location"
            ref={pickupLocationRef}
            required
          />
        </div>
        <div>
          <label htmlFor="claimed">Claimed:</label>
          <input type="checkbox" id="claimed" ref={claimedRef} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;
