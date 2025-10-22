import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import user from "../models/user";

let getUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: { exclude: ["password_hash"] },
        });
      } else if (userId) {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: { exclude: ["password_hash"] },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["id", "fullname", "email", "role_id", "password_hash"],
          where: { email: email },
          raw: true,
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password_hash);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password_hash;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your email is not in the system";
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let hanbleUserRegister = (email, password, fullname) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkUserEmail(email);
      if (isExist) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used, please try another email",
        });
      } else {
        let hashPasswordFromBcrypt = await bcrypt.hashSync(password, 10);
        let newUser = await db.User.create({
          email: email,
          password_hash: hashPasswordFromBcrypt,
          fullname: fullname,
          role_id: "2",
        });

        resolve({
          errCode: 0,
          errMessage: "OK",
          user: { id: newUser.id, email: email, fullname: fullname },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getUsers: getUsers,
  hanbleUserRegister: hanbleUserRegister,
};
