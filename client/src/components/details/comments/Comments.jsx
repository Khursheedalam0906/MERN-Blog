import React, { useEffect, useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import axios from "axios";
import { getAccessToken } from "../../../utils/common-utils";
import { Typography } from "@mui/material";
import Comment from "./Comment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { usernamed } = useContext(DataContext);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const initialvalues = {
    name: usernamed,
    postId: post._id,
    comments: comment,
    date: new Date(),
  };

  const headers = { Authorization: getAccessToken() };

  const SendComment = async () => {
    const response = await axios.post(
      "mern-blog-api-ten.vercel.app/comment/new",
      initialvalues,
      { headers }
    );
    setMessage(response.data.message);
    setComment("");
    setTimeout(() => {
      setMessage("");
    }, 3000);
    setToggle((prevState) => !prevState);
  };

  const getComment = async () => {
    const response = await axios.get(
      `mern-blog-api-ten.vercel.app/getcomments/${post._id}`,
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );
    setComments(response.data);
  };

  useEffect(() => {
    getComment();
  }, [post, toggle]);

  console.log(comments);

  return (
    <Box>
      {message && (
        <Typography
          style={{ textAlign: "center", fontSize: 16, fontWeight: 700 }}
        >
          {message}
        </Typography>
      )}
      <Container>
        <Image src={url} alt="display picture" />
        <StyledTextArea
          value={comment}
          minRows={5}
          placeholder="what's on your mind?"
          onChange={(e) => setComment(e.target.value)}
        ></StyledTextArea>
        <Button variant="contained" color="primary" onClick={SendComment}>
          Post
        </Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment comment={comment} setToggle={setToggle} />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
