import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Insert = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [dept, setDept] = useState("");
  const [loading, setLoading] = useState(false);

  const notify = () => toast("every Feild is required");
  const notify2 = () => toast("Data Inserted Successfully");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    // e.preventDefault();
    if (name === "" || email === "" || password === "" || dept === "") {
      notify();
    } else {
      setLoading(true);
      const res = await fetch("/emp/insert", {
        method: "POST",
        body: JSON.stringify({ name, email, password, dept }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await res.json();

      setLoading(false);
      notify2();
    }
  };

  return (
    <>
      <ToastContainer />
      <form>
        <Typography mt={4} variant="h4" align="center" gutterBottom>
          Insert Data
        </Typography>
        <Grid container justifyContent="center" style={{ minHeight: "60vh" }}>
          <Grid
            container
            item
            xs={3}
            justifyContent="space-evenly"
            direction="column"
          >
            <item>
              <TextField
                label="Enter the name"
                id="txtName"
                variant="standard"
                fullWidth
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </item>
            <item>
              <TextField
                id="txtEmail"
                label="Enter the email"
                variant="standard"
                fullWidth
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </item>
            <item>
              <TextField
                id="txtPass"
                label="Enter the password"
                variant="standard"
                fullWidth
                value={password}
                required
                onChange={(e) => setPass(e.target.value)}
              />
            </item>
            <item>
              <TextField
                id="txtDept"
                label="Enter the dept"
                variant="standard"
                fullWidth
                value={dept}
                required
                onChange={(e) => setDept(e.target.value)}
              />
            </item>
            <LoadingButton
              onClick={handleClick}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              fullWidth
            >
              Insert Data
            </LoadingButton>
            <Button variant="contained" onClick={() => navigate("/")}>
              Display
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Insert;
