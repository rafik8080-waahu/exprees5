const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSChema");
const { validateAdduser, validateUserLogin } = require("../utils/validateDB");

//register a user ctlr
const addUser = async (req, res) => {
  //validate user inputs
  const { error } = await validateAdduser(req.body);
  error && res.status(401).send(error.details[0].message);

  //hashing passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const email = await User.findOne({ email: req.body.email });
  email && res.status(401).send("email already exist");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });
  const createdUser = await user.save();
  res.status(201).json({ user_created: createdUser });
};

//user login ctlr
const userLogin = async (req, res) => {
  //validate user inputs
  const { error } = await validateUserLogin(req.body);
  error && res.status(401).send(error.details[0].message);

  //checking the user
  const account = await User.findOne({ email: req.body.email });
  !account && res.status(401).send("user does not exist");

  //compparing passwords
  const correctPass = await bcrypt.compare(req.body.password, account.password);
  !correctPass && res.send("invalid password");

  //jwt token
  const token = jwt.sign({ _id: account._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send(token);

  // res.send("Login successful");
};

module.exports = { addUser, userLogin };
