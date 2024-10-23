import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box,  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  labour_Id: "",
  name: "",
  gender: "",
  category:"",
  experiance: 0,
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state.labour_Id);


  useEffect(() => {
    const fetchInitialPosts = async (labourId) => {  
      const response = await axios.get(`http://localhost:8080/zelo/getLabourById/${labourId}`);
      console.log(response.data);
      setForm(response.data);
    };
    fetchInitialPosts(currId);
  }, [currId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios      
      .post("http://localhost:8080/zelo/addLabour",form)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
      navigate('/')
    };


  const handleChange = (e) => {
    setForm({ ...form, postTechStack: [...form.postTechStack, e.target.value] });
  };

  return (
    <Paper sx={{ padding: "2%" }} elevation={2}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Edit Faculty Details
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto"}}
            onChange={(e) => setForm({ ...form, labour_Id: e.target.value })}
            label="Labour Id"
            variant="outlined"
            value={form.labour_Id}
           InputProps={{
            readOnly: true  // Makes the input field non-editable
            }}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            label="Name"
            variant="outlined"
            value={form.name}
          />
          <TextField
            min="0"
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            label="Category"
            variant="outlined"
            value={form.category}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) =>
              setForm({ ...form, experiance: e.target.value })
            }
            label="Years of Experience"
            variant="outlined"
            value={form.experiance}
          />
              <FormControl
            component="fieldset"
            sx={{ width: "50%", margin: "2% auto" }}
          >
           <FormLabel component="legend">Gender</FormLabel>{" "}
            {/* Label for the radio group */}
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            align="center"
            variant="contained"
            type="submit"
          
          >
            Submit
          </Button>
        </form>
    </Paper>
  );
};

export default Edit;
