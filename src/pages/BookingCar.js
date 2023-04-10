import React, { useEffect, useState } from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Modal, message } from "antd";
import {
  DollarCircleOutlined,
  TagsOutlined,
  CarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import StripeCheckout from "react-stripe-checkout";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCarsInSearch } from "../redux/actions/carsAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import Footer from "./Footer";
import useShareableState from "../../../gozee/src/utils/useSharableState";
import { useBetween } from "use-between";
const { RangePicker } = DatePicker;

function BookingCar() {
  const { id } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const {
    from,
    setFrom,
    to,
    setTo,
    totalMins,
    setTotalMins,
    totalAmount,
    setTotalAmount,
  } = useBetween(useShareableState);

  const [driver, setdriver] = useState(true);
  let onsitePay = true;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCarsInSearch());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setcar(cars.find((o) => o._id == id));
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTotalAmount(
        Number(Math.ceil((totalMins * 1.0) / 60) * car.rentPerHour)
      );
      setdriver(false);
    }
  }, [cars, id, totalMins]);

  useEffect(() => {
    setTotalAmount(Number(Math.ceil((totalMins * 1.0) / 60) * car.rentPerHour));
    if (driver) {
      setTotalAmount(
        Number(totalAmount + 50 * Math.ceil((totalMins * 1.0) / 60))
      ); // driver charge is Rs:50 per hour
    }
  }, [car, driver, totalMins]);

  function hasMinimumFourHours() {
    if (Number(Math.ceil((totalMins * 1.0) / 60)) < 4) {
      return false;
    }
    return true;
  }
  function showMinimumFourHoursError() {
    Modal.error({
      title: "Can't book",
      content: "Minimum booking time is 4 hours",
    });
  }

  function setFilter(values) {
    if (values) {
      if (values.length > 1) {
        var selectedFrom = moment(new Date(values[0]._d)).format(
          "MMM DD yyyy HH:mm"
        );
        var selectedTo = moment(new Date(values[1]._d)).format(
          "MMM DD yyyy HH:mm"
        );
        var temp = [];
        var filterCars = [];

        if (car.bookedTimeSlots.length == 0) {
          temp.push(car);
        } else {
          for (var booking of car.bookedTimeSlots) {
            if (
              moment(values[0]._d).isBetween(
                booking.from,
                booking.to,
                undefined,
                "[]"
              ) ||
              moment(values[1]._d).isBetween(
                booking.from,
                booking.to,
                undefined,
                "[]"
              ) ||
              moment(booking.from).isBetween(
                selectedFrom,
                selectedTo,
                undefined,
                "[]"
              ) ||
              moment(booking.to).isBetween(
                selectedFrom,
                selectedTo,
                undefined,
                "[]"
              )
            ) {
              filterCars.push(car);
            } else {
              temp.push(car);
            }
          }
        }

        temp = [...new Set(temp)];
        temp =
          filterCars?.length > 0
            ? temp.filter((item) => !filterCars.includes(item)) //filtering the booked cars.....
            : temp;
        if (temp.length === 0) {
          message.info("Please select free slots!");
        } else {
          setFrom(moment(values[0]).format("MMM DD yyyy HH"));
          setTo(moment(values[1]).format("MMM DD yyyy HH"));
          setTotalMins(values[1].diff(values[0], "minutes"));
        }
      }
    } else {
      setTotalMins(0);
    }
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
    if (hasMinimumFourHours() === true) {
      dispatch(bookCar(reqObj));
    } else {
      showMinimumFourHoursError();
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
              backgroundColor: "white",
              borderRadius: "10px",
              width: "90%",
              marginTop: "30px",
              marginBottom: "30px",
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
                onChange={setFilter}
              />
              <br />
              <button
                className="btn2 mt-2 mb-2"
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
                    color: "black",
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
                    <span style={{ color: "black" }}> Driver Required</span>
                  </Checkbox>
                  <h3 style={{ color: "black" }}>
                    Total Amount : {totalAmount}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <StripeCheckout
                      token={onToken}
                      shippingAddress
                      billingAddress={true}
                      disabled={!hasMinimumFourHours()}
                      currency={process.env.REACT_APP_CURRENCY}
                      amount={Number(totalAmount) * 100}
                      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                    >
                      <button
                        className="btn1"
                        style={{ width: "100px" }}
                        onClick={() => {
                          if (!hasMinimumFourHours()) {
                            showMinimumFourHoursError();
                          }
                          onsitePay = false;
                        }}
                      >
                        Pay Now
                      </button>
                    </StripeCheckout>
                    <button
                      className="btn1"
                      style={{ marginBottom: "20px", width: "100px" }}
                      onClick={() => {
                        onsitePay = true;
                        onToken();
                      }}
                    >
                      Pay On Site
                    </button>
                  </div>
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
