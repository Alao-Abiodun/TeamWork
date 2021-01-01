"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var nodemailer = require('nodemailer');

exports.sendMail = function _callee(config) {
  var transporter, info;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: "mayowad43@gmail.com",
              pass: "DevDabiriMayowa"
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(_objectSpread({
            from: 'teamwork@gmail.com'
          }, config)));

        case 4:
          info = _context.sent;
          return _context.abrupt("return", "Preview URL: %s', ".concat(nodemailer.getTestMessageUrl(info)));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          throw new Error(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};