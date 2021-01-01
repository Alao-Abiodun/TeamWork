"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var _require = require("../helpers/email"),
    sendMail = _require.sendMail;

var JWT_SECRET = process.env.JWT_SECRET;

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "signUp",
    value: function signUp(req, res) {
      var _req$body, firstName, lastName, email, password, gender, jobRole, department, address, existingUser, salt, hashPassword, user, config, createdUser, token;

      return regeneratorRuntime.async(function signUp$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, gender = _req$body.gender, jobRole = _req$body.jobRole, department = _req$body.department, address = _req$body.address;
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(_user["default"].findOne({
                email: email
              }));

            case 4:
              existingUser = _context.sent;

              if (!existingUser) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: "User already exist, please signIn."
              }));

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(_bcryptjs["default"].genSalt(10));

            case 9:
              salt = _context.sent;
              _context.next = 12;
              return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, salt));

            case 12:
              hashPassword = _context.sent;
              user = new _user["default"]({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                gender: gender,
                jobRole: jobRole,
                department: department,
                address: address // token,

              });
              config = {
                subject: "Login details",
                to: email,
                html: "<h1>Login Details</h1>\n        <p>email ".concat(email, "</p>\n        <p>password: ").concat(password, "</p>")
              };
              _context.next = 17;
              return regeneratorRuntime.awrap(sendMail(config));

            case 17:
              _context.next = 19;
              return regeneratorRuntime.awrap(user.save());

            case 19:
              createdUser = _context.sent;
              _context.next = 22;
              return regeneratorRuntime.awrap(_jsonwebtoken["default"].sign({
                id: createdUser._id
              }, JWT_SECRET, {
                expiresIn: "2h"
              }));

            case 22:
              token = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: "success",
                data: {
                  message: "User successfully created",
                  token: token,
                  userId: createdUser._id
                }
              }));

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);
              return _context.abrupt("return", res.status(500).json({
                status: _context.t0,
                data: {
                  message: "Server Error"
                }
              }));

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 26]]);
    }
  }, {
    key: "Login",
    value: function Login(req, res) {
      var _req$body2, email, password, user, confirmPassword, token;

      return regeneratorRuntime.async(function Login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.next = 4;
              return regeneratorRuntime.awrap(_user["default"].findOne({
                email: email
              }));

            case 4:
              user = _context2.sent;

              if (user) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                // status: error,
                error: "This email does not exist"
              }));

            case 9:
              _context2.next = 11;
              return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

            case 11:
              confirmPassword = _context2.sent;

              if (confirmPassword) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: "error",
                data: {
                  message: "User password is incorrect"
                }
              }));

            case 16:
              _context2.next = 18;
              return regeneratorRuntime.awrap(_jsonwebtoken["default"].sign({
                id: user._id
              }, JWT_SECRET, {
                expiresIn: "2h"
              }));

            case 18:
              token = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: "success",
                data: {
                  token: token,
                  userId: user._id
                }
              }));

            case 20:
              _context2.next = 26;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", res.status(500).json({
                status: _context2.t0,
                error: new Error("Server Error")
              }));

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 22]]);
    }
  }]);

  return UserController;
}();

var _default = new UserController();

exports["default"] = _default;