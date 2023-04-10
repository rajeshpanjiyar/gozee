import axios from "axios";
import { message } from "antd";
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(
      "https://gozee.vercel.app/api/bookings/bookcar",
      reqObj
    );

    dispatch({ type: "LOADING", payload: false });
    message.success("Your car booked successfully");
    setTimeout(() => {
      window.location.href = "/userbookings";
    }, 500);
  } catch (error) {
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong , please try later");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(
      "https://gozee.vercel.app/api/bookings/getallbookings", {user: user}
    );
    console.log('booking', response);
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    dispatch({ type: "LOADING", payload: false });
  }
};

export const markaspaid = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(
      "https://gozee.vercel.app/api/bookings/markaspaid",
      reqObj
    );

    dispatch({ type: "LOADING", payload: false });
    message.success("Marked paid successfully");
    window.location.reload();
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong , please try later");
  }
};