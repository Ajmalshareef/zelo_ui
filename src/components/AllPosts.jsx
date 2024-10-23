import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Edit';

import {
  Box,
    Card,
    Grid,
    InputAdornment,
    TextField,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState("");
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

const handleEdit = (labour_Id) => {
  navigate("/edit",{state:{labour_Id}});
}

    useEffect(() => {
      const fetchPosts = async () => {
        const response = await axios.get(`http://localhost:8080/zelo/getLabourByName?name=${query}`);
        console.log(query,response.data);
        setPost(response.data);
      };
      const fetchInitialPosts = async () => {
          const response = await axios.get(`http://localhost:8080/zelo/getAllLabours`);
          setPost(response.data);
      }
      fetchInitialPosts();
      if (query.length === 0) fetchInitialPosts();
      if (query.length > 0) fetchPosts();
    }, [query]);

    const handleDelete = (id) => {
      async function deletePost() {
        await axios.delete(`http://localhost:8080/zelo/delete/${id}`);
    }
    deletePost();
      window.location.reload();
    }
   
    console.log('post',post);
      return (
    <>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} sx={12} md={12} lg={12}>
      <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search by Name..."
            sx={{ width: "100%", margin: "2% 0" }}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>
      {post &&
        post.map((p) => {
          return (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <Card sx={{ padding: "3%", overflow: "hidden", width: "84%", backgroundColor:"#ADD8E6" }}>
                <Typography        
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600", fontFamily:"sans-serif" }}
                >
             {p.name}
                </Typography>
                <Typography  sx={{ color: "#585858", marginTop:"2%", fontFamily:"cursive" }} variant="body" >
                  Designation: {p.category}
                </Typography>
                <br />
                <br />
                <Typography variant="h6" sx={{ fontFamily:"unset", fontSize:"400"}}>
                  Experiance: {p.experiance} years
                </Typography>
                <Typography sx={{fontFamily:"serif",fontSize:"400"}} gutterBottom  variant="body">Skills : </Typography>
                {p.category}
                 <DeleteIcon onClick={() => handleDelete(p.labour_Id)} />
                <EditIcon onClick={() => handleEdit(p.labour_Id)} /> 
              </Card>
            </Grid>
          );
        })}
    </Grid>
    </>
 
  )
}

export default Search