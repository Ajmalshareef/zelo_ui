import React, { useEffect,useState,useRef } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const initial = {
  labour_Id: 0,
  name: "",
  age: 0,
  category: "",
  experiance: 0,
  gender: "",
};





function GenderSelection() {
  const [gender, setGender] = useState(""); // No default selection

  const handleChangeRadioButton = (event) => {
    setGender(event.target.value);
  };
}

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [latestId, setLatestId] = useState(0);
  const labourIdRef = useRef(null); 

  useEffect(() => {
    const fetchInitialPosts = async () => {  
      const response = await axios.get(`http://localhost:8080/zelo/getLatestId`);
      setLatestId(response.data);
      setForm({ ...form, labour_Id: response.data }); 
    };
      fetchInitialPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/zelo/addLabour", form)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  const { labour_Id, name, age , category, experiance, gender } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      postTechStack: [...form.postTechStack, e.target.value],
    });
  };

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Labour
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
            sx={{ width: "50%", margin: "2% auto" }}
            label="Teachers ID"
            variant="outlined"
            inputRef={labourIdRef} 
            value={latestId}
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
            value={name}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            label="Age"
            variant="outlined"
            value={age}
          />
          <TextField
            min="0"
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            label="Category"
            variant="outlined"
            value={category}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, experiance: e.target.value })}
            label="Years of Experiance"
            variant="outlined"
            value={experiance}
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
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
