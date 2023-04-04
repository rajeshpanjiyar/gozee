import React, { useEffect, useState } from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import {
  DollarCircleOutlined,
  TagsOutlined,
  CarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import StripeCheckout from "react-stripe-checkout";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import Footer from "./Footer";
const { RangePicker } = DatePicker;

function BookingCar() {
  const { id } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalMins, setTotalmins] = useState(0);
  const [driver, setdriver] = useState(false);
  let onsitePay = true;
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setcar(cars.find((o) => o._id == id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [cars]);
  useEffect(() => {
    setTotalAmount(Number(Math.ceil((totalMins*1.0 / 60)) * car.rentPerHour));
    if (driver) {
      setTotalAmount(Number(totalAmount + 50 * Math.ceil(totalMins * 1.0 / 60))); // driver charge is Rs:50 per hour
    }
  }, [driver, totalMins]);
  function selectTimeSlots(values) {
    if (values) {
      setFrom(moment(values[0]).format("MMM DD yyyy HH"));
      setTo(moment(values[1]).format("MMM DD yyyy HH"));
      setTotalmins(values[1].diff(values[0], "minutes"));
    } else {
      setTotalmins(0);
    }
  }
  function hasMinimumFourHours(){
    if(Number(Math.ceil((totalMins*1.0 / 60))) < 4){
      return false;
    }
    return true
  }
  function showMinimumFourHoursError(){
    Modal.error({
      title: "Can't book",
      content: "Minimum booking time is 4 hours",
    });
  }
  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: id,
      totalMins,
      totalAmount,
      driverRequired: driver,
      onsitePay: onsitePay,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    if(hasMinimumFourHours() === true){ 
    dispatch(bookCar(reqObj));
    }else{
      showMinimumFourHoursError()
    }
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} alt={car.name} className="carimg2 bs2" />
        </Col>
        <Col
          lg={10}
          sm={24}
          xs={24}
          style={{ marginLeft: "65px", bottom: "10px" }}
        >
          <div
            style={{
              // backgroundColor: "#24ffffc9",
              backgroundColor: "#28d8d8",
              borderRadius: "10px",
              // maxHeight: "400px",
              width: "90%",
            }}
          >
            <Divider>
              <h4 style={{ color: "white" }}>DETAILS</h4>
            </Divider>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "0.5px",
                marginRight: "0.5px",
              }}
            >
              <div style={{ margin: "4px" }} className="car-headings">
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <TagsOutlined />
                  </span>
                  <span className="car-data">Model</span>
                </p>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <UsergroupAddOutlined />
                  </span>
                  <span className="car-data">Car Type</span>
                </p>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <DollarCircleOutlined />
                  </span>
                  <span className="car-data">Rent</span>
                </p>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <CarOutlined />
                  </span>
                  <span className="car-data">Fuel Type</span>
                </p>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  <span className="booking-icons">
                    <UsergroupAddOutlined />
                  </span>
                  <span className="car-data">Max Persons</span>
                </p>
              </div>
              <div className="car-headData">
                <p>
                  <span className="car-data2">{car.name}</span>
                </p>
                <p>
                  <span className="car-data2">
                    {car.carType === 0 ? "Non-A/C" : "A/C"}
                  </span>
                </p>
                <p>
                  <span className="car-data2">{car.rentPerHour} Rs/-</span>
                </p>
                <p>
                  <span className="car-data2">{car.fuelType}</span>
                </p>
                <p>
                  <span className="car-data2">{car.capacity}</span>
                </p>
              </div>
            </div>
            <Divider>
              <h4 style={{ color: "white" }}>SELECT TIME SLOTS</h4>
            </Divider>
            <div>
              <RangePicker
                className="RangePicker"
                showTime={{ format: "HH:mm a" }}
                format="MMM DD yyyy HH:mm"
                onChange={selectTimeSlots}
              />
              <br />
              <button
                className="btn1 mt-2 mb-2"
                style={{
                  marginBottom: "4px",
                  borderRadius: "5px",
                  outline: "none",
                  border: "none",
                }}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                See Booked Slots
              </button>
              {from && to && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    marginRight: "56px",
                    color: "white",
                  }}
                >
                  <p>
                    Total Hours : <b>{Math.ceil((totalMins * 1.0) / 60)}</b>
                  </p>
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setdriver(true);
                      } else {
                        setdriver(false);
                      }
                    }}
                  >
                    <span style={{ color: "white" }}> Driver Required</span>
                  </Checkbox>
                  <h3 style={{ color: "white" }}>
                    Total Amount : {totalAmount}
                  </h3>

                  <StripeCheckout
                    token={onToken}
                    shippingAddress
                    billingAddress={true}
                    disabled = {!hasMinimumFourHours()}
                    currency={process.env.REACT_APP_CURRENCY}
                    amount={Number(totalAmount)*100}
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                  >
                    <button
                      className="btn1"
                      onClick = {()=>{
                        if(!hasMinimumFourHours()){
                          showMinimumFourHoursError();
                        }
                       onsitePay = false; 
                      }}
                      style={{
                        marginBottom: "4px",
                        borderRadius: "5px",
                        fontWeight: "500",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      Pay Now
                    </button>
                  </StripeCheckout>
                  <button
                    className="btn1"
                    onClick={() => {
                      onsitePay = true;
                      onToken();
                    }}
                  >
                    Pay On Site
                  </button>
                </div>
              )}
            </div>
          </div>
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2 ml-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
      <Footer />
    </DefaultLayout>
  );
}

export default BookingCar;
