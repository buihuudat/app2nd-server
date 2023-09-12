const co = require("co");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const config = process.env;

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(500).json({
          errors: [
            {
              path: "email",
              msg: "Email không đúng hoặc chưa được đăng ký",
            },
          ],
        });
      }
      const dessPass = CryptoJS.AES.decrypt(
        user.password,
        config.PASSWORD_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (dessPass !== password) {
        return res.status(500).json({
          errors: [
            {
              path: "password",
              msg: "Mật khẩu không hợp lệ",
            },
          ],
        });
      }

      const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        token,
        user: await User.findById(user._id).select("-password").exec(),
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  register: async (req, res) => {
    const { password } = req.body;
    try {
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
      const user = await User.create(req.body);
      const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({
        token,
        user: await User.findById(user._id).select("-password").exec(),
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
