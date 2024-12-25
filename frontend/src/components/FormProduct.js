// rafce
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { remove, create, getdata } from "../functions/product";

import { toast } from "react-toastify";


const FormProduct = () => {
  // javascript
  const tam = "tam roitai";
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = async () => {
    getdata()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();
    for (const key in form) {
      formWithImageData.append(key, form[key]);
    }

    //console.log(formWithImageData)
    create(formWithImageData)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };
  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        toast.success('Delete  ' + res.data.name + ' Success')
        loadData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* ID Field */}
          <div>
            <TextField
              id="outlined-basic"
              label="ID"
              name="_id"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* Name Field */}
          <div>
            <TextField
              id="outlined-basic"
              label="Name"
              name="name"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* Detail Field */}
          <div>
            <TextField
              id="outlined-basic"
              label="Description"
              name="description"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* Stock Field */}
          <div>
            <TextField
              type="number"
              id="outlined-basic"
              label="Stock"
              name="stock"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* Stock Field */}
          <div>
            <TextField
              id="outlined-basic"
              label="Categories"
              name="categories"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* Price Field */}
          <div>
            <TextField
              type="number"
              id="outlined-basic"
              label="Price"
              name="price"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* File Field */}
          <div>
            <TextField
              type="file"
              id="outlined-basic"
              label=""
              name="file"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* File2 Field */}
          <div>
            <TextField
              type="file"
              id="outlined-basic"
              label=""
              name="file2"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* Submit Button */}
          <Button
            variant="contained"
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
          >
            Submit
          </Button>
        </form>
      </div>

      {/* Product Table */}
      <div className="container mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Product List</h2>
        <TableContainer component={Paper} className="rounded-lg">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>ID-Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>File-1</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.categories}</TableCell>
                    <TableCell>{item.tags}</TableCell>
                    <TableCell>{item.file}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        color="error"
                        className="cursor-pointer"
                        onClick={() => handleRemove(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link to={"/edit/" + item._id}>
                        <EditOutlinedIcon className="text-blue-500 cursor-pointer" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );

};

export default FormProduct;
