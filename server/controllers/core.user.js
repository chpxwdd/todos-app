const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const modelCoreUser = require("../models/core.user");
const modelCoreRole = require("../models/core.role");

const register = async (req, res) => {
  const validateRegisterInput = require("../validation/core.user.register");
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const user = await modelCoreUser.findOne({ email: req.body.email }).exec();

  if (user)
    return res.status(400).json({ email: "Email already exists", ...errors });

  modelCoreRole.findOne({ title: "member" }).exec((err, member) => {
    if (err) {
      console.error("Please re-install data", err);
      return res
        .status(400)
        .json({ register: "Please re-install data", ...errors });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error("There was an error", err);
        return res.status(400).json({ salt: err, ...errors });
      }
      const { username, email, password } = req.body;
      const role = member._id;

      bcrypt.hash(password, salt, (err, password) => {
        if (err) return console.error("There was an error", err);

        new modelCoreUser({ username, email, password, role })
          .save()
          .then((user) => res.json(user))
          .catch((err) => {
            console.error("Save with error:", err);
            return res.status(400).json({ save: err, ...errors });
          });
      });
    });
  });
};

const login = async (req, res) => {
  const validateLoginInput = require("../validation/core.user.login");
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;
  const user = await modelCoreUser.findOne({ email }).exec();

  if (!user) {
    errors.email = "User not found";
    return res.status(404).json(errors);
  }

  const role = await modelCoreRole.findOne({ role: user.role }).exec();

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch) {
      errors.password = "Incorrect Password";
      return res.status(401).json(errors);
    }

    const payload = { id: user._id, username: user.username, role: user.role };
    const jwtOptions = { expiresIn: 3600 };

    jwt.sign(payload, config.get("jwtPhrase"), jwtOptions, (err, token) => {
      if (err) {
        // console.error("There is some error in token", err);
        errors.sign = "There is some error in token";
        return res.status(401).json(errors);
      }

      res.json({
        success: true,
        token: token,
        user: user.username,
        role: role.title,
      });
    });
  });
};

const me = async (req, res) => {
  const { id, username, email } = req.user;
  /** @todo fetch all user data */
  return res.json({ id, username, email });
};

exports.login = login;
exports.register = register;
exports.me = me;
