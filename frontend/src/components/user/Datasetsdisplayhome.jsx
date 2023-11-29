import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../templates/Card";
import Navbar from "../templates/Navbar";
import { Avatar } from "@mui/material";

export default function Datasetsdisplayhome() {
  let navigate = useNavigate();
  let [datasets, setDatasets] = useState([]);
  //setting redirection routes for various system users
  useEffect(() => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log("user", user);
      if (user.group === "admin") {
        navigate("/approve");
      } else if (user.group === "publisher") {
        navigate("/mydatasets");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  // make request to "http://10.1.38.115:8000/api/datasets/" to get all the datasets and store them in datasets
  useEffect(() => {
    axios
      .get("/api/datasets/", {
        headers: {},
      })
      .then((res) => {
        console.log("res", res);
        setDatasets(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="myDatasets">
      <Navbar />

      <div className="myDatasets-heading" style={{ marginTop: "10vh" }}>
        <h2 style={{ fontSize: "xx-large" }}>DATA FOUNDATION</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <img
          alt="Data_Foundation_Logo"
          src="https://images.squarespace-cdn.com/content/v1/64e4e29725c04b3719d055ad/1692721851024-TQQ4RCABD66UNB4R5DW8/image-asset.png"
          variant="square"
          height={"300px"}
          width={"300px"}
        />
      </div>
      <div className="myDatasets-list">
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="flex-end"
          sx={{ margin: "10px", marginTop: "30px" }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </Stack>
        {/*  mapping the various datasets to display on card */}
        <List
          className="list"
          sx={{
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {datasets.map((dataset, index) => {
            console.log(dataset);
            return <Card info={dataset} key={index} />;
          })}
        </List>
      </div>
    </div>
  );
}
