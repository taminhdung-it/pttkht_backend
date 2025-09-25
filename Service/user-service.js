
const jwt = require('jsonwebtoken');
const User = require("../Model/user");
const bcrypt = require("bcrypt");

async function login_user(username, password) {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      throw new Error("Tài khoản hoặc mật khẩu sai.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Tài khoản hoặc mật khẩu sai.");
    }

    const access_token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refresh_token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    return {
      refresh_token: refresh_token,
      access_token: access_token,
      username: user.username,
    };
  } catch (e) {
    return { error: e.message };
  }
}

const register_user = async (username, password, email) => {
  const username_check = await User.findOne({ where: { username } });
  if (username_check) {
    throw new Error("Tên tài khoản bị trùng lặp");
  }

  const email_check = await User.findOne({ where: { email } });
  if (email_check) {
    throw new Error("Email bị trùng lặp");
  }

  if (password.length < 8) {
    throw new Error("Mật khẩu không đủ độ dài (tối thiểu 8 ký tự)");
  }
  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/.test(password)) {
    throw new Error("Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt");
  }

  if (!/^[a-zA-Z][a-zA-Z0-9_.]*@[a-zA-Z]+\.(com|net|org)$/.test(email)) {
    throw new Error("Email sai định dạng");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
    role_id: 1,
  });

  return {
    userId: newUser.id,
    username: newUser.username,
    email: newUser.email,
  };
};


module.exports = { login_user, register_user }