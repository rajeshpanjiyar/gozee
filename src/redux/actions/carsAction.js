import axios from "axios";
import { message } from "antd";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(
      "https://gozee.vercel.app/api/cars/getallcars", {user:user}
    );
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllCarsInSearch = () => async(dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(
      "https://gozee.vercel.app/api/cars/getallcarsinsearch"
    );
    dispatch({ type: "GET_ALL_CARS_IN_SEARCH", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
}

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(
      "https://gozee.vercel.app/api/cars/addcar",
      reqObj
    );

    dispatch({ type: "LOADING", payload: false });
    message.success("New car added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.put(
      "https://gozee.vercel.app/api/cars/editcar",
      reqObj
    );

    dispatch({ type: "LOADING", payload: false });
    message.success("Car details updated successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(
      "https://gozee.vercel.app/api/cars/deletecar",
      reqObj
    );

    dispatch({ type: "LOADING", payload: false });
    message.success("Car deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
