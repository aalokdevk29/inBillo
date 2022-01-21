import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { getAllUsers } from "../../utils/service";
import Navbar from "../navbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allUsers = useSelector((state) => state.login.allUsers);
  const userDetails = useSelector((state) => state.login.userDetails);

  const token = localStorage.getItem("inBillo-session-token");

  useEffect(() => {
    if (!token) history.push("/sign-in");
    dispatch(getAllUsers());
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="mt-5 pt-5">
          {allUsers &&
            allUsers.map((user, id) => {
              return (
                <div key={id} className="card mt-4">
                  <div className="bg-light d-flex justify-content-end">
                    <div className="card-body">
                      {user.firstName} {user.lastName}
                    </div>
                    <Link
                      to={`/payment/?senderId=${
                        userDetails && userDetails._id
                      }&senderTotal=${
                        userDetails && userDetails.totalBalance
                      }&receiverId=${user._id}&receiverTotal=${
                        user.totalBalance
                      }&receiverName=${user.firstName} ${user.lastName}`}
                    >
                      <button
                        type="button"
                        className="btn btn-primary btn-sm m-3"
                      >
                        Pay
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
