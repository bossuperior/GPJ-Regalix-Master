const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const { notifyLine, getIPClient } = require("../Functions/Notify");

// const tokenLine = "{Token-LineNotify-Here}";

exports.register = async (req, res) => {
  try {
    //code
    // 1.CheckUser
    const { name, password } = req.body;
    var user = await User.findOne({ name });
    if (user) {
      return res.send("User Already Exists!!!").status(400);
    }
    // 2.Encrypt
    const salt = await bcrypt.genSalt(10);
    user = new User({
      name,
      password,
    });
    user.password = await bcrypt.hash(password, salt);
    // 3.Save
    await user.save();
    res.send("Register Success!!");
  } catch (err) {
    //code
    console.log(err);
    res.status(500).send("Server Error");
  }
};
exports.login = async (req, res) => {
  try {
    // ดึงข้อมูลจากคำขอ
    const { name, password } = req.body;

    // 1. ตรวจสอบผู้ใช้และอัปเดต IP
    const ip = await getIPClient(req); // ฟังก์ชันสำหรับดึง IP ของ client
    const user = await User.findOneAndUpdate({ name }, { ip }, { new: true });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Password Invalid!!!");
    }

    // 2. สร้าง Payload
    const payload = {
      user: {
        name: user.name,
        role: user.role,
      },
    };

    // 3. สร้าง Token
    jwt.sign(
      payload,
      "jwtsecret", // คีย์ลับ (ควรย้ายไปใช้ตัวแปรสิ่งแวดล้อม)
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;

        // ส่ง Token และ Payload กลับไปให้ Client
        res.json({ token, payload });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// line + face jaa
// exports.loginLine = async (req, res) => {
//   try {
//     //code
//     const { userId, displayName, pictureUrl } = req.body;
//     var data = {
//       name: userId,
//       displayName: displayName,
//       picture: pictureUrl,
//     };
//     // 1 Check
//     var user = await User.findOneAndUpdate({ name: userId }, { new: true });
//     if (user) {
//       console.log("User Updated!!!");
//     } else {
//       user = new User(data);
//       await user.save();
//     }
//     // 2. Payload
//     var payload = {
//       user,
//     };
//     // console.log(payload)
//     // 3. Generate
//     jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
//       if (err) throw err;
//       res.json({ token, payload });
//     });
//   } catch (err) {
//     //code
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// };
// exports.loginFacebook = async (req, res) => {
//   try {
//     //code
//     const { userID, name, email } = req.body;
//     var data = {
//       name: userID,
//       displayName: name,
//       email: email,
//     };
//     // 1 Check
//     var user = await User.findOneAndUpdate({ name: userID }, { new: true });
//     if (user) {
//       console.log("User Updated!!!");
//     } else {
//       user = new User(data);
//       await user.save();
//     }
//     // 2. Payload
//     var payload = {
//       user,
//     };
//     // console.log(payload)
//     // 3. Generate
//     jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
//       if (err) throw err;
//       res.json({ token, payload });
//     });
//   } catch (err) {
//     //code
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// };

exports.currentUser = async (req, res) => {
  try {
    //code
    console.log("currentUser", req.user);
    const user = await User.findOne({ name: req.user.name })
      .select("-password")
      .exec();

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
