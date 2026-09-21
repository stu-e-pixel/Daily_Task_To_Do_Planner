const statuscode = require("../../utils/statuscode");
const User = require("../../model/user.model");
const cloudinary = require("../../config/cloudinary.config");
const bcryptjs = require("bcryptjs");
const SendEmailOtp = require("../../utils/sendEmail");
const OtpModel = require("../../model/otp");
const jwt = require("jsonwebtoken");

class AuthController {
  async signup(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      const existUser = await User.findOne({ email });
      if (existUser) {
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "user already exist",
        });
      }

      const salt = 10;
      const hashedpassword = await bcryptjs.hash(password, salt);

      const user = new User({
        name: name,
        email: email,
        phone: phone,
        password: hashedpassword,
      });

      if (req.file) {
        user.image = req.file.path;
        user.public_Id = req.file.filename;
      }

      const data = await user.save();
      await SendEmailOtp(req, data);

      if (!data) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "user not created succesfully",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message:
            "user created succesfully otp sent in email for verification",
          data: data,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async verify(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Place provide email and otp",
        });
      }

      const existUser = await User.findOne({ email });
      if (existUser.isVerified) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Your email alreaddy verified",
        });
      }

      const emailVerification = await OtpModel.findOne({
        userId: existUser._id,
      }).sort({ createdAt: -1 });

      if (!emailVerification) {
        await SendEmailOtp(req, existUser);

        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "your otp is invalid place provide valid otp",
        });
      }

      if (String(emailVerification.otp) !== String(otp)) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "your otp is not expire place provide new send otp",
        });
      }

      const currentTime = Date.now();
      const createdTime = emailVerification.createdAt.getTime();
      const expireTime = createdTime + 15 * 60 * 1000;

      if (currentTime > expireTime) {
        await OtpModel.deleteOne({
          _id: emailVerification._id,
        });
        await SendEmailOtp(req, existUser);
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "your otp is invalid place provide valid otp",
        });
      }

      existUser.isVerified = true;
      await existUser.save();

      await OtpModel.deleteMany({
        userId: existUser._id,
      });

      return res.status(statuscode.OK).json({
        status: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "user not found",
        });
      }

      const isVerify = await bcryptjs.compare(password, user.password);
      if (!isVerify) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Invalid cradencials",
        });
      }

      if (!user.isVerified) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "your email is not verified",
        });
      }

      const token = await jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        },
      );

      return res.status(statuscode.OK).json({
        status: true,
        message: "Login succesfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
        },
        token: token,
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async dashboard(req, res) {
    try {
      const user = await User.findById(req.user.id);
      return res.status(statuscode.OK).json({
        status: true,
        message: "Welcome to dashboard",
        data: user,
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
  async updateProfile(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const userById = await User.findById(id);

      let image = userById.image;
      let public_Id = userById.public_Id;

      if (req.file) {
        if (userById.public_Id) {
          await cloudinary.uploader.destroy(userById.public_Id);
        }
        image = req.file.path;
        public_Id = req.file.filename;
      }


      const userdata = await User.findByIdAndUpdate(
        id,
        {name,email,image},
        {new:true}
      )

      if(!userdata){
        return res.status(statuscode.NOT_FOUND).json({
            status:false,
            message:"user profile is not updated"
        })
      }else{
        return res.status(statuscode.OK).json({
            status:true,
            message:"user profile is updated",
            data:userdata
        })
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
