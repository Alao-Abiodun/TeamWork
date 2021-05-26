import User from '../models/user.model';
import bcrypt from 'bcryptjs';
let password = 'admin123';

exports.seedAdmin = () => {
  try {
    // check if admin exist
    User.findOne({ role: 'admin' }, (err, admin) => {
      if (err) throw err;
      if (admin)
        return res.status(401).json({ message: 'admin already exist' });
    });
    User.create(
      {
        fullName: 'abiodun-admin',
        email: 'abiodunDev@gmail.com',
        role: 'admin',
      },
      (err, user) => {
        if (err) throw err;
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save((err, savedUser) => {
              if (err) throw err;
              return 'admin created';
            });
          });
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};
