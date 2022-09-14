import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Display = () => {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const notify = () => toast("Deleted SuccessFully");

  const handleRead = async () => {
    const res = await fetch("/emp/read");
    const data = await res.json();
    setDatas(data);
  };

  useEffect(() => {
    handleRead();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch("/emp/delete", {
      method: "POST",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await res.json();

    //for update state after deleting
    const resRead = await fetch("/emp/read");
    const data = await resRead.json();
    setDatas(data);
    notify();
  };

  return (
    <>
      <ToastContainer />
      <Grid mt={2} container>
        <TableContainer>
          <Table stickyHeader={true} aria-label="employee table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Password</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((data) => {
                return (
                  <TableRow
                    key={data._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" align="center" scope="data">
                      {data._id}
                    </TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.email}</TableCell>
                    <TableCell align="center">{data.password}</TableCell>
                    <TableCell align="center">{data.dept}</TableCell>
                    <TableCell align="center">
                      <Link className="links_dark" to={`/update/${data._id}`}>
                        <ModeEditIcon
                          cursur="pointer"
                          style={{ cursor: "pointer" }}
                        />
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <DeleteForeverIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(data._id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default Display;
