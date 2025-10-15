import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";

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
          attributes: ["email", "role_id", "password_hash"],
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
};
