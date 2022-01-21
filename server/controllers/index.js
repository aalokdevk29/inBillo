const model = require("../models/schema");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { isDateBetween } = require("../utils/helper");

exports.createUser = async function (req, res) {
  let user = new model.userSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  const emailExist = await model.userSchema.findOne(
    { email: req.body.email },
    async function (task, error) {
      if (task) {
        res
          .status(301)
          .json({ message: "This Email Id is already registered" });
      } else {
        let count = await model.userSchema.count();
        bcrypt.hash(req.body.password, 10, function (error, hash) {
          if (hash) {
            user.password = hash;
            user.save().then(function (task, error) {
              if (task) {
                return res.status(200).json({
                  message: "User registered successfully",
                  status: 200,
                });
              }
              if (error) {
                return res.status(500).json({ message: error, status: 500 });
              }
            });
          }
          if (error) {
            return res.status(500).json({ message: error, status: 500 });
          }
        });
      }
      if (error) {
        return res.status(500).json({ message: error, status: 500 });
      }
    }
  );
  if (emailExist && emailExist.email == user.email) {
    return res.status(400).json({
      message: "User already registerd  Huh! you can login",
      status: 400,
    });
  }
};

exports.login = function (req, res) {
  let emailExist = model.userSchema.findOne({ email: req.body.email });
  emailExist.then(function (emailExist) {
    if (emailExist) {
      bcrypt.compare(
        req.body.password,
        emailExist.password,
        function (err, task) {
          if (task) {
            let token = jwt.sign({ email: emailExist.email }, "secret");
            res.status(200).json({
              token: token,
              data: emailExist,
              message: "user verified",
            });
          } else {
            return res.status(500).json({ message: "Password is not correct" });
          }
        }
      );
    } else {
      return res.status(500).json({ message: "user email is not registered." });
    }
  });
  emailExist.catch(function (error) {
    return res.status(501).json({ message: "some internal error" });
  });
};

exports.payment = async function (req, res, next) {
  try {
    const receiverId = req.params.receiverId;
    const senderId = req.params.senderId;
    const amount = req.body.amount;

    const receiverAccountBalance = await model.userSchema.findOne({
      _id: receiverId,
    });
    totalAmount = receiverAccountBalance.totalBalance;
    receiverTotalBalance = totalAmount + amount;
    const senderAccountBalance = await model.userSchema.findOne({
      _id: senderId,
    });
    senderTotalAmount = senderAccountBalance.totalBalance;

    senderTotalBalance = senderTotalAmount - amount;

    const data = await model.userSchema.findOneAndUpdate(
      {
        _id: senderId,
      },
      {
        $push: {
          account: {
            debitAmount: amount,
            debitDate: new Date(),
            sender: req.params.senderId,
          },
        },
        $set: {
          totalBalance: senderTotalBalance,
        },
      },
      { useFindAndModify: false }
    );
    if (data) {
      const task = await model.userSchema.findOneAndUpdate(
        {
          _id: receiverId,
        },
        {
          $push: {
            account: {
              creditAmount: amount,
              creditDate: new Date(),
              receiver: receiverId,
            },
          },
          $set: {
            totalBalance: receiverTotalBalance,
          },
        },
        { useFindAndModify: false }
      );
      task.save();
      if (task) res.send({ success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: err, status: 500 });
  }
};

exports.getUsers = async function (req, res) {
  const getAllUsers = await model.userSchema.find({});
  if (!getAllUsers) {
    return res.status(400).json({ message: "bad request" });
  }
  return res.send(getAllUsers);
};

exports.getCurrentUser = async function (req, res) {
  const userDetails = await model.userSchema.find({ _id: req.params.id });
  if (!userDetails) {
    return res.status(400).json({ message: "bad request" });
  }
  return res.send(getAllUsers);
};

exports.getUserTransaction = async function (req, res) {
  var start = new Date();
  start.setHours(0, 0, 0, 0);
  var end = new Date();
  end.setHours(23, 59, 59, 999);

  const user = await model.userSchema.findOne({
    _id: req.params.id,
  });

  user.account = user?.account?.filter(
    (logs) =>
      isDateBetween(start, end, logs.debitDate) ||
      isDateBetween(start, end, logs.creditDate)
  );

  if (!user) {
    return res.status(400).json({ message: "bad request" });
  }
  return res.send(user);
};
