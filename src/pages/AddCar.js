import { Col, Row, Form, Input, Select, message } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCar } from "../redux/actions/carsAction";
import FormData from "form-data";
import axios from "axios";
const { Option } = Select;

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null);
  var imageUrl = "";

  const getPhoto = (e) => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    setFile(formData);
  };

  const uploadPhoto = async () => {
    const url = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_UPLOAD_CAR_PHOTO;

    await axios
      .post(url, file)
      .then(function (response) {
        imageUrl = response.data.secure_url;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinish = async (values) => {
    try {
      await uploadPhoto();
      values.bookedTimeSlots = [];
      values.image = imageUrl;
      imageUrl = "";
      dispatch(addCar(values));
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    } catch (error) {
      message.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      {user.admin ? (
        <Row justify="center mt-4">
          <Col
            lg={12}
            sm={24}
            xs={24}
            className="p-2 mb-3"
            style={{ backgroundColor: "#896deb" }}
          >
            <Form className="bs1 p-1" layout="vertical" onFinish={onFinish}>
              <h3 style={{ color: "white" }}>Add New Car</h3>
              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the car name..." />
              </Form.Item>
              <Form.Item
                name="carType"
                label="Car Type"
                rules={[{ required: true }]}
              >
                <Select defaultValue="0" style={{ width: 220 }}>
                  <Option value="0">Non-A/C</Option>
                  <Option value="1">A/C</Option>
                </Select>
              </Form.Item>
              <div style = {{padding: "20px 0px"}}>
              <p style = {{color: "white"}}>* Select Photo</p>
              <input type="file" onChange={getPhoto} />
              </div>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the Rent Per Hour..." />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the capacity..." />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the fuel type..." />
              </Form.Item>

              <button className="btn1">ADD CAR</button>
            </Form>
          </Col>
        </Row>
      ) : (
        <div style={{ height: "50vh" }}>
          <h1 className="errorheading">Error 404, Page not found</h1>
          <button
            className="btnerror mt-2"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go back
          </button>
        </div>
      )}
    </DefaultLayout>
  );
}

export default AddCar;
