import { Col, Row, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { addCar, editCar, getAllCars } from "../redux/actions/carsAction";
const { Option } = Select;

function EditCar() {
  const { carid } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalcars, settotalcars] = useState([]);
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id == carid));
    }
  }, [cars]);

  function onFinish(values) {
    values._id = car._id;
    dispatch(editCar(values));
  }
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
            {totalcars.length > 0 && (
              <Form
                initialValues={car}
                className="bs1 p-1"
                layout="vertical"
                onFinish={onFinish}
              >
                <h3 style={{ color: "white" }}>Edit Car</h3>
                <hr />
                <Form.Item
                  name="name"
                  label="Car name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                name="carType"
                label="Car Type"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: 220 }}
                >
                  <Option value="0">Non-A/C</Option>
                  <Option value="1">A/C</Option>
                </Select>
              </Form.Item>
                <Form.Item
                  name="image"
                  label="Image url"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="rentPerHour"
                  label="Rent per hour"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="capacity"
                  label="Capacity"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="fuelType"
                  label="Fuel Type"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <button className="btn1">EDIT CAR</button>
              </Form>
            )}
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

export default EditCar;
