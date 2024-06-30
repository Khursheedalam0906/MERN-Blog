import React, { useContext, useState } from "react";
import { Delete } from "@mui/icons-material";
import { DataContext } from "../../../context/DataProvider";
import { Box, Typography, styled } from "@mui/material";
import axios from "axios";
import { getAccessToken } from "../../../utils/common-utils";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
`;

const StyledDate = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-left: 15px;
`;
const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {
  const { usernamed } = useContext(DataContext);
  const [message, setMessage] = useState("");

  const removeComment = async () => {
    const response = await axios.delete(
      `mern-blog-api-ten.vercel.app/deletecomment/${comment._id}`,
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );
    setMessage(response.data.message);
    setTimeout(() => {
      setMessage("");
      setToggle((prevState) => !prevState);
    }, 1000);
  };

  return (
    <Component>
      {message && (
        <Typography style={{ textAlign: "center", fontWeight: 600 }}>
          {message}
        </Typography>
      )}
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === usernamed && <DeleteIcon onClick={removeComment} />}
      </Container>
      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
