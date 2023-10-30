const User = require("../modals/user.modal");
const { generateToken } = require("../utils/token");

const registerUser = async (req, res) => {
  const { userName, role } = req.body;

  if (!userName || !role) {
    return res
      .status(400)
      .json({ status: "error", msg: "fields can not be empty" });
  }

  try {
    const alreadyExist = await User.findOne({ userName });

    if (alreadyExist) {
      return res
        .status(400)
        .json({ status: "error", msg: `${userName} already exist` });
    }

    const userObj = {
      userName,
      role,
    };

    const user = await User.create({ ...userObj });

    const token = await generateToken(user);

    res.status(201).json({ data: { user, token } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", msg: "could not create user" });
  }
};

const loginUser = async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res
      .status(500)
      .json({ status: "error", msg: "please ptovider username" });
  }

  try {
    const foundUser = await User.findOne({ userName });

    if (!foundUser) {
      return res
        .status(500)
        .json({ status: "error", msg: "invalid credentials -username" });
    }

    const token = generateToken(foundUser);
    return res.status(200).json({ data: foundUser, token });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", msg: "something went wrong" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
