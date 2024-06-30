import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/common-utils";
import { Box, Grid } from "@mui/material";
import Post from "./Post";
import { Link, useSearchParams } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  //Define your params
  const queryParams = { category: category || "" };

  // Define your headers

  const headers = { Authorization: getAccessToken() };

  const getAllPost = async () => {
    try {
      const response = await axios.get(
        "mern-blog-api-ten.vercel.app/getallpost",
        {
          params: queryParams,
          headers: headers,
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, [category]);

  return (
    <Grid container>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={6}>
            <Link
              to={`/details/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          No data availabe to display
        </Box>
      )}
    </Grid>
  );
};

export default Posts;
