
import { login, register } from "../../api/services/authService";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from "../types/authTypes";

// Action to handle user login
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const data = await login(credentials);
    localStorage.setItem("token", data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data, // { user, token }
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// Action to handle user registration
export const registerUser = (userData) => async (dispatch) => {
  try {
    const data = await register(userData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// Action to handle logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");

  dispatch({
    type: LOGOUT,
  });
};
