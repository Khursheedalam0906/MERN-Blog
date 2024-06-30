import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAccessToken } from "../../utils/common-utils";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";

const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { usernamed } = useContext(DataContext);
  const navigate = useNavigate();
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const headers = { Authorization: getAccessToken() };

  const getPostDetails = async () => {
    try {
      const response = await axios.get(
        `mern-blog-api-ten.vercel.app/getpostdetails/${id}`,
        { headers }
      );
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);
  //

  const deleteBlog = async () => {
    try {
      await axios.delete(`mern-blog-api-ten.vercel.app/deletepost/${id}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      });
      console.log("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const Container = styled(Box)(({ theme }) => ({
    margin: "50px 100px",
    [theme.breakpoints.down("md")]: {
      margin: 0,
    },
  }));

  const Image = styled("img")({
    width: "100%",
    height: "50vh",
    onjectFit: "cover",
  });

  const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 40px 0 10px 0;
    word-break: break-word;
  `;

  const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
  `;

  const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
  `;

  const Author = styled(Box)`
    color: #878787;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  `;
  return (
    <Container>
      <Image src={url} alt="blog" />
      <Box style={{ float: "right" }}>
        {usernamed === post.username && (
          <>
            <Link to={`/update/${id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon color="error" onClick={() => deleteBlog()} />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Typography>
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {post.username}
          </Box>
        </Typography>
        <Typography>{new Date(post.createDate).toDateString()}</Typography>
      </Author>
      <Typography>{post.description}</Typography>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
