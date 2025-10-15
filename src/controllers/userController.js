const userService = require("../services/userService");

const handleLogin = async (req, res) => {
  // const { email, password } = req.body;
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({
      errCode: 1,
      message: `Email or password are required`,
    });
  }

  const userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData ? userData.user : {},
  });
};

const getAllUsers = async (req, res) => {
  let id = req.body.id;

  const users = await userService.getUsers(id);

  return res.status(200).json({
    users,
  });
};

module.exports = { handleLogin: handleLogin, getAllUsers: getAllUsers };
