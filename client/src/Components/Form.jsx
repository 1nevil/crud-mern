import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updateEmp,createEmp } from "../Features/crudSlice";

function Form({ id }) {
  const [empValues, setEmpValues] = useState({
    name: "",
    email: "",
    password: "",
    dept: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleInput = (e) => {
    setEmpValues({ ...empValues, [e.target.name]: e.target.value });
  };

  const notify = () => toast("every Feild is required");
  const notify2 = (toastValue) => toast(toastValue);

  const emps = useSelector((state) => state.emps.employyes);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleControls = async () => {
      emps &&
        emps.forEach((emp) => {
          if (emp._id === id) {
            setEmpValues({
              name: emp.name,
              email: emp.email,
              password: emp.password,
              dept: emp.dept,
            });
          }
        });
    };
    if (id) {
      handleControls();
    }
  }, [emps, id]);

  const handleClick = async (e) => {
    const { name, email, password, dept } = empValues;
    if (name === "" || email === "" || password === "" || dept === "") {
      notify();
    } else {
      setLoading(true);
      if (id) {
        dispatch(updateEmp({ ...empValues, id: id }));
        notify2(`${empValues.name} updated SuccessFully`);
      } else {
        const employee = { name, email, password, dept };
        dispatch(createEmp(employee));
        notify2(`${empValues.name} inserted SuccessFully`);
      }
      setLoading(false);
      setEmpValues({ name: "", email: "", password: "", dept: "" });
    }
  };

  return (
    <div>
      <ToastContainer />
      <form>
        <Typography mt={4} variant="h4" align="center" gutterBottom>
          {id ? "Update" : "Insert"} Data
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
                value={empValues.name}
                required
                name="name"
                onChange={(e) => handleInput(e)}
              />
            </item>
            <item>
              <TextField
                id="txtEmail"
                label="Enter the email"
                variant="standard"
                fullWidth
                name="email"
                value={empValues.email}
                required
                onChange={(e) => handleInput(e)}
              />
            </item>
            <item>
              <TextField
                id="txtPass"
                label="Enter the password"
                variant="standard"
                fullWidth
                name="password"
                value={empValues.password}
                required
                onChange={(e) => handleInput(e)}
              />
            </item>
            <item>
              <TextField
                id="txtDept"
                name="dept"
                label="Enter the dept"
                variant="standard"
                fullWidth
                value={empValues.dept}
                required
                onChange={(e) => handleInput(e)}
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
              {id ? " Update" : "Insert"} Data
            </LoadingButton>
            <Button variant="contained" onClick={() => navigate("/")}>
              Display
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Form;
