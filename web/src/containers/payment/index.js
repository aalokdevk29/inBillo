import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  FormLabel,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useQueryParam } from "use-query-params";

import { sendPayment } from "../../utils/service";
import Navbar from "../navbar";

const Payment = () => {
  const { push } = useHistory();
  const [amount, setAmount] = useState();

  const [senderId] = useQueryParam("senderId");
  const [senderTotal] = useQueryParam("senderTotal");
  const [receiverId] = useQueryParam("receiverId");
  const [receiverTotal] = useQueryParam("receiverTotal");
  const [receiverName] = useQueryParam("receiverName");

  const styles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(11),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const handleChange = (e) => {
    if (!e.target.value) e.preventDefault();
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    if (amount) {
      const amounts = parseInt(amount);
      sendPayment(
        amounts,
        senderId,
        senderTotal,
        receiverId,
        receiverTotal,
        push
      );
    }
    e.preventDefault();
  };

  const classes = styles();

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Payment Gateway
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormLabel>Payment to : {receiverName}</FormLabel>
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Your Account Balance : {senderTotal}</FormLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  variant="outlined"
                  required
                  fullWidth
                  id="amount"
                  label="Enter Amount."
                  name="amount"
                  autoComplete="amount"
                  onChange={(e) => handleChange(e)}
                  value={amount}
                  error={amount === ""}
                  helperText={
                    amount === ""
                      ? "Please enter amount"
                      : amount <= senderTotal
                      ? "Amount should be less than your balance"
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handleSubmit(e)}
            >
              Pay Now
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Payment;
