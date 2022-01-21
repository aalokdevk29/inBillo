import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTransaction } from "../../utils/service";
import Navbar from "../navbar";
import "../../styles/transaction.css";

const Transaction = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.login.userDetails);
  const userTransaction = useSelector((state) => state.login.userTransaction);

  useEffect(() => {
    if (userDetails?._id) dispatch(getTransaction(userDetails._id));
  }, [userDetails]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="mt-5 pt-5 white-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Credit Amount</th>
                <th scope="col">Debit Amount</th>
              </tr>
            </thead>
            <tbody>
              {userTransaction &&
                userTransaction.account.map((user, id) => {
                  return (
                    <>
                      <tr>
                        <td>
                          {userTransaction.firstName} {userTransaction.lastName}
                        </td>
                        <td key={id}>{user.creditAmount}</td>
                        <td>{user.debitAmount}</td>
                      </tr>
                    </>
                  );
                })}
              <tr>
                <td colspan="2"></td>
                <td colspan="2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-5">
            <h5>
              Your current account balance is :{" "}
              {userTransaction && userTransaction.totalBalance}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
