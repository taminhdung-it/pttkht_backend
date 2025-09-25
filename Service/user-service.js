
const jwt = require('jsonwebtoken');
const User = require("../Model/user");
const Resident = require("../Model/resident");
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
async function add_resident(name, dob, gender, room_number, admission_date,phone_number,email,citizen_identification_card) {
  try {
    if (!/^(1[0-9]{3}|[2-9][0-9]{3,})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dob)) {
      throw new Error("Ngày tháng năm sinh không hợp lệ");
    }
    if (!/^(Male|Female|Other)$/.test(gender)) {
      throw new Error("Giới tính không hợp lệ");
    }
    if (!/^[0-9]+$/.test(room_number)) {
      throw new Error("Số phòng không không hợp lệ");
    }
    if (!/^(1[0-9]{3}|[2-9][0-9]{3,})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(admission_date)) {
      throw new Error("Ngày tháng năm dân cư không hợp lệ");
    }
    if (!/^0[389][0-9]{8}$/.test(phone_number)){
      throw new Error("Số điện thoại không hợp lệ");
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_.]*@[a-zA-Z]+\.(com|net|org)$/.test(email)){
      throw new Error("Email không hợp lệ");
    }
    if (!/^\d{12}$/.test(citizen_identification_card)){
      throw new Error("Căn cước công dân không hợp lệ");
    }
    if (!/^(?:.*\s){2,}.*$/.test(name)) {//1 tên phải có 2 từ trở lên
      throw new Error("Tên không hợp lệ");//Hàm trả về catch nếu không thoả điều kiện
    } else {
      const name_check=await Resident.findOne({where:{name}});
      if (name_check){
        const name_check1=await Resident.findOne({where:{name,citizen_identification_card}});
        if (name_check1){
          throw new Error("Tên bị trùng lặp");
        }
      }
    }
    const newresident = await Resident.create({
      name,
      dob,
      gender,
      room_number,
      admission_date,
      phone_number,
      email,
      citizen_identification_card
    });
    return {
      name: newresident.name,
      birthday: newresident.dob,
      room_number: newresident.room_number,
      citizen_identification_card: newresident.citizen_identification_card
    };
  } catch (e) {
    return { error: e.message }
  }
}
async function find_resident(citizen_identification_card) {
  try{
    if (!/^\d{12}$/.test(citizen_identification_card)){
      throw new Error("Căn cước công dân không hợp lệ");
    }
    const citizen_identification_card_check=Resident.findOne({where: {citizen_identification_card}});
    if (citizen_identification_card_check){
      return citizen_identification_card_check;
    }
  } catch (e){
    return { error: e.message };
  }
}
module.exports = { login_user, register_user,add_resident,find_resident};
