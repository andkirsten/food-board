import React, { useRef } from "react";
import { firestore } from "../../Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./AddPost.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/AuthContext";

const AddPost = (props) => {
  //get user info from db
  const { user } = useAuth();

  // refs for form fields
  const titleRef = useRef(null);
  const detailsRef = useRef(null);
  const foodTypeRef = useRef("produce");
  const photoRef = useRef(null);
  const pickupLocationRef = useRef(null);
  const contactInfoRef = useRef(null);

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    props.setLoad(true);
    try {
      // set data values
      const title = titleRef.current.value;
      const details = detailsRef.current.value;
      const foodType = foodTypeRef.current.value;
      const photo = photoRef.current.files[0];
      const pickupLocation = pickupLocationRef.current.value;
      const contact = contactInfoRef.current.value;
      const claimed = false;
      const date = new Date().toISOString();
      const owner = user.uid;

      // if photo, upload photo to storage
      if (photo) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${photo.name}`);
        await uploadBytes(storageRef, photo);

        const photoUrl = await getDownloadURL(storageRef);

        await addDoc(collection(firestore, "posts"), {
          title,
          details,
          foodType,
          photoUrl,
          pickupLocation,
          contact,
          claimed,
          date,
          owner,
        });

        titleRef.current.value = "";
        detailsRef.current.value = "";
        foodTypeRef.current.value = "produce";
        photoRef.current.value = "";
        pickupLocationRef.current.value = "";
        contactInfoRef.current.value = "";

        props.setPopup(false);
        window.location.reload();
      } else {
        // if no photo, add post without photo
        await addDoc(collection(firestore, "posts"), {
          title,
          details,
          foodType,
          photoUrl: "",
          pickupLocation,
          contact,
          claimed,
          date,
          owner,
        });

        // clear form fields and reset page
        titleRef.current.value = "";
        detailsRef.current.value = "";
        foodTypeRef.current.value = "produce";
        photoRef.current.value = "";
        pickupLocationRef.current.value = "";
        contactInfoRef.current.value = "";

        props.setPopup(false);
        props.setLoad(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      props.setLoad(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleAddSubmit}>
        <Form.Group controlId="postTitle" className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            ref={titleRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="postDetails" className="mb-2">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter details"
            ref={detailsRef}
            required
          />
          <Form.Text className="text-muted">
            Please include details such as quantity, quality, expiration date,
            etc.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="postFoodType" className="mb-2">
          <Form.Label>Select Food Type</Form.Label>
          <Form.Select aria-label="Food Type Select" ref={foodTypeRef} required>
            <option value="produce">Produce</option>
            <option value="meat">Meat</option>
            <option value="canned">Canned Goods</option>
            <option value="pantry">Pantry Staples: flour, sugar, etc.</option>
            <option value="baby">Baby Food or Formula</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="postPhoto" className="mb-2">
          <Form.Label>Photo &#40;Optional&#41;</Form.Label>
          <Form.Control type="file" ref={photoRef} />
        </Form.Group>
        <Form.Group controlId="postPickupLocation" className="mb-2">
          <Form.Label>Pickup Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pickup location"
            ref={pickupLocationRef}
            required
          />
          <Form.Text className="text-muted">
            Please choose a convenient location for pickup &#40;e.g. library,
            park, etc.&#41;
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="postContactInfo" className="mb-2">
          <Form.Label>Contact Info</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contact info"
            ref={contactInfoRef}
            required
          />
          <Form.Text className="text-muted">
            Please enter a name and contact preferences &#40;e.g. email, phone
            number, etc.&#41;
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="addpost__submit"
          disabled={props.load}
        >
          Add Post
        </Button>
      </Form>
    </div>
  );
};

export default AddPost;
