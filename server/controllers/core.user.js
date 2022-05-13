const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const modelCoreUser = require("../models/core.user");
const modelCoreRole = require("../models/core.role");

const register = async (req, res) => {
  const validateRegisterInput = require("../validation/core.user.register");
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);
  
  const user = await modelCoreUser.findOne({ email: req.body.email }).exec();

  if (user) {
    errors.email = "Email already exists";
    return res.status(400).json(errors);
  }

  const ROLE_MEMBER = "member";

  modelCoreRole
    .findOne({
      title: ROLE_MEMBER,
    })
    .exec((err, member) => {
      if (err) {
        console.error(
          "Can`t find role member in DB. Please re-install data",
          err
        );
        return;
      }
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error("There was an error", err);
          return;
        }
        const { username, email, password } = req.body;

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.error("There was an error", err);
            return;
          }
          var coreUser = new modelCoreUser({
            username,
            email,
            password: hash,
            role: member._id,
          });

          coreUser
            .save()
            .then((user) => {
              res.json(user);
            })
            .catch((err) => {
              console.error("Registered user is not save with error:", err);
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
      return res.status(400).json(errors);
    }
    const payload = { id: user.id, username: user.username, role: user.role };
    const jwtOptions = { expiresIn: 3600 };
    const jwtPhrase = "secret";

    jwt.sign(payload, jwtPhrase, jwtOptions, (err, token) => {
      if (err) {
        console.error("There is some error in token", err);
        return;
      }

      res.json({
        success: true,
        token: `Bearer ${token}`,
        userId: user.username,
        roleId: role.name,
      });
    });
  });
};

const me = async (req, res) => {
  const { id, username, email } = req.user;
  return res.json({ id, username, email });
};

exports.login = login;
exports.register = register;
exports.me = me;
