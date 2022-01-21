import axios from "axios";
import { decodeToken, redirect, saveToken } from "./auth";
import {
  loginSuccess,
  loginError,
  allUsers,
  getUser,
  userTransaction,
} from "../redux/login/action";
import Swal from "sweetalert2";

export const signup = (values) => {
  axios
    .post("http://localhost:8000/create", values)
    .then((res) => {
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Registration Successul.",
          type: "Success",
          text: `Registration Successul. Now you can login.`,
        });
        redirect("sign-in");
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        type: "fail",
        text: `Registration Fail. Please try with another email .`,
      });
    });
};

export const signIn = (user, push) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/login", user)
      .then((res) => {
        if (res && res.data) {
          Promise.all([
            saveToken(res.data.token, res.data.firstName, res.data.lastName),
          ]);
          dispatch(loginSuccess(res.data.data));
          const token = decodeToken();
          if (token) {
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Login Successul.",
                type: "Success",
                text: `Login Successul. Now you can view dashboard.`,
              });
              push("/");
            }
          }
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          type: "Success",
          text: `Login Failed. Email and password in not correct.`,
        });
        push("/sign-up");
        dispatch(loginError(err.message));
      });
  };
};

export const getAllUsers = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8000/all")
      .then((res) => {
        dispatch(allUsers(res.data));
      })
      .catch((err) => {
        dispatch(loginError(err.message));
      });
  };
};

export const getCurrentUser = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:8000/${id}`).then((res) => {
      if (res && res.data) dispatch(getUser(res.data));
    });
  };
};

export const sendPayment = (
  amount,
  senderId,
  senderTotal,
  receiverId,
  receiverAmount,
  push
) => {
  const receiverTotal = parseInt(receiverAmount);
  axios
    .put(`http://localhost:8000/payment/${receiverId}/${senderId}`, {
      amount: amount,
      senderTotalBalance: senderTotal - amount,
      receiverTotalBalance: receiverTotal + amount,
    })
    .then((res) => {
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Payment Success.",
          type: "Success",
          html: `Your Payment has been done. <b>$${amount}</b> is debited from your account and You current balance is : $${
            senderTotal - amount
          }`,
        }).then((onSuccess) => {
          if (onSuccess) {
            push("/");
          }
        });
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        type: "Success",
        html: `Your Payment has been done. <b>$${amount}</b> is debited from your account and You current balance is : $${
          senderTotal - amount
        }`,
      });
    });
};

export const getTransaction = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:8000/transactions/${id}`).then((res) => {
      if (res && res.data) {
        dispatch(userTransaction(res.data));
      }
    });
  };
};
