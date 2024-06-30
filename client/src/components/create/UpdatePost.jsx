import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

import {
  styled,
  Box,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import { getAccessToken } from "../../utils/common-utils";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  outline: none;
`;

const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageShow, setImageShow] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState("");
  const [createDate, setCreateDate] = useState("");

  //
  const url = imageUrl
    ? imageUrl
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?";

  const URL = "mern-blog-api-ten.vercel.app";

  const { usernamed } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const updateInitialPost = {
    title: title,
    description: description,
    picture: imageUrl,
    username: usernamed,
    categories: categories,
    createDate: createDate,
  };

  //

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageShow(reader.result);
    };
  };

  const handleUpload = async () => {
    if (!title || !description || !image) {
      alert("Please Enter all the fields like Image, Title, Description");
    } else {
      const formData = new FormData();
      formData.append("name", image.name);
      formData.append("file", image);

      try {
        const response = await axios.post(`${URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Image uploaded successfully:", response.data);
        alert("Everything is fine now you can post");
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  const getPostDetails = async () => {
    try {
      const response = await axios.get(
        `mern-blog-api-ten.vercel.app/getpostdetails/${id}`,
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      );
      console.log(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setImageUrl(response.data.picture);
      setCategories(response.data.categories);
      setCreateDate(response.data.createDate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);
  //

  const headers = { Authorization: getAccessToken() };

  const Update = async () => {
    try {
      const response = await axios.put(`/updatepost/${id}`, updateInitialPost, {
        headers,
      });
      navigate(`/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {imageShow ? (
        <Image src={imageShow} alt="CreateBlogImg" />
      ) : (
        <Image src={url} alt="CreateBlogImg" />
      )}
      <StyledFormControl>
        <label htmlFor="fileinput">
          <AddCircle fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileinput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <InputTextField
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleUpload}>
          Check
        </Button>
        <Button style={{ marginLeft: 6 }} variant="contained" onClick={Update}>
          Update
        </Button>
      </StyledFormControl>
      <Textarea
        value={description}
        minRows={5}
        placeholder="Tell your story..."
        onChange={(e) => setDescription(e.target.value)}
      />
    </Container>
  );
};

export default UpdatePost;
