import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings, markaspaid } from "../redux/actions/bookingActions";
import { Col, Row, Input, Form } from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";
import defaultcar from "../images/defaultcar.jpg";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  function markAsPaid(val) {
    const obj = {
      id: val._id,
    };
    dispatch(markaspaid(obj));
  }
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h1
        className="text-center"
        style={{
          color: "black !important",
          marginTop: "5.2rem",
          textDecoration: "underline",
        }}
      >
        {user.admin ? "All Recent Bookings" : "Your Booking History"}
      </h1>
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24} style={{ color: "darkslategray" }}>
          {user.admin
            ? bookings.map((booking) => {
                return (
                  <div>
                    <Row
                      gutter={16}
                      className="Userbooking bs1 text-left"
                      style={{
                        border: "1px solid #896deb",
                        padding: "1rem",
                        margin: "20px 20px",
                        borderRadius: "10px",
                      }}
                    >
                      <Col lg={6} sm={24}>
                        {booking.car ? (
                          <p>
                            <b>
                              {booking.car.name}(
                              {booking.car.carType === 0 ? "Non-A/C" : "A/C"})
                            </b>
                          </p>
                        ) : (
                          <p>
                            <b>Not Available</b>
                          </p>
                        )}
                        <p>
                          User : <b>{booking.user?.email || "No email"}</b>
                        </p>
                        <p>
                          Total Hours :{" "}
                          <b>{Math.ceil((booking.totalMins * 1.0) / 60)}</b>
                        </p>
                        <p>
                          Driver :
                          {booking.driverRequired ? (
                            <b> Required</b>
                          ) : (
                            <b> Not Required</b>
                          )}
                        </p>
                        <p>
                          Total amount : <b>{booking.totalAmount}</b>
                        </p>
                      </Col>

                      <Col lg={12} sm={24}>
                        {!booking.onsitePay && (
                          <p>
                            Transaction Id : <b>{booking.transactionId}</b>
                          </p>
                        )}
                        <p>
                          User Contact :{" "}
                          <b>{booking.user?.phone || "No phone"}</b>
                        </p>
                        <p>
                          From: <b>{booking.bookedTimeSlots.from}</b>
                        </p>
                        <p>
                          To: <b>{booking.bookedTimeSlots.to}</b>
                        </p>
                        <p>
                          Date of booking:{" "}
                          <b>
                            {moment(booking.createdAt).format("MMM-DD-yyyy")}
                          </b>
                        </p>
                        <p>
                          Paid: <b>{booking.paid ? "Paid" : "Not Paid"}</b>
                          {!booking.paid && (
                            <button
                              style={{
                                border: "2px solid #896deb",
                                borderRadius: "5px",
                                padding: "5px 8px",
                                marginLeft: "20px",
                                color: "#896deb",
                                fontWeight: "700",
                              }}
                              onClick={() => {
                                markAsPaid(booking);
                              }}
                            >
                              Mark as Paid
                            </button>
                          )}
                        </p>
                      </Col>

                      <Col lg={6} sm={24} className="text-right">
                        {booking.car ? (
                          <img
                            style={{ borderRadius: 5 }}
                            src={booking.car.image}
                            height="140"
                            className="p-2"
                          />
                        ) : (
                          <img
                            style={{ borderRadius: 5 }}
                            src={defaultcar}
                            height="140"
                            className="p-2"
                          />
                        )}
                      </Col>
                    </Row>
                  </div>
                );
              })
            : bookings
                .filter((o) => o.user._id == user._id)
                .map((booking) => {
                  return (
                    <div>
                      <Row
                        gutter={20}
                        className="Userbooking bs1 text-left"
                        style={{
                          border: "1px solid #896deb",
                          padding: "1rem",
                          margin: "20px 20px",
                          borderRadius: "10px",
                        }}
                      >
                        <Col lg={6} sm={24}>
                          {booking.car ? (
                            <p>
                              <b>
                                {booking.car.name}(
                                {booking.car.carType === 0 ? "Non-A/C" : "A/C"})
                              </b>
                            </p>
                          ) : (
                            <p>
                              <b>Not Available</b>
                            </p>
                          )}
                          <p>
                            User : <b>{booking.user.email}</b>
                          </p>
                          <p>
                            Total Hours :{" "}
                            <b>{Math.ceil((booking.totalMins * 1.0) / 60)}</b>
                          </p>
                          <p>
                            Driver :
                            {booking.driverRequired ? (
                              <b> Required</b>
                            ) : (
                              <b> Not Required</b>
                            )}
                          </p>
                          <p>
                            Total amount : <b>{booking.totalAmount}</b>
                          </p>
                        </Col>

                        <Col lg={12} sm={24}>
                          {!booking.onsitePay && (
                            <p>
                              Transaction Id : <b>{booking.transactionId}</b>
                            </p>
                          )}
                          <p>
                            User Contact : <b>{booking.user.phone}</b>
                          </p>
                          <p>
                            From: <b>{booking.bookedTimeSlots.from}</b>
                          </p>
                          <p>
                            To: <b>{booking.bookedTimeSlots.to}</b>
                          </p>
                          <p>
                            Date of booking:{" "}
                            <b>
                              {moment(booking.createdAt).format("MMM-DD-yyyy")}
                            </b>
                          </p>
                          <p>
                            Paid: <b>{booking.paid ? "Paid" : "Not Paid"}</b>
                          </p>
                        </Col>

                        <Col lg={6} sm={24} className="text-right">
                          {booking.car ? (
                            <img
                              style={{ borderRadius: 5 }}
                              src={booking.car.image}
                              height="140"
                              className="p-2"
                            />
                          ) : (
                            <img
                              style={{ borderRadius: 5 }}
                              src={defaultcar}
                              height="140"
                              className="p-2"
                            />
                          )}
                        </Col>
                      </Row>
                    </div>
                  );
                })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
