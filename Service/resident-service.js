const Resident = require("../Model/resident");

async function add_resident(name, dob, gender, room_number, admission_date, phone_number, email, citizen_identification_card) {
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
    if (!/^0[389][0-9]{8}$/.test(phone_number)) {
      throw new Error("Số điện thoại không hợp lệ");
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_.]*@[a-zA-Z]+\.(com|net|org)$/.test(email)) {
      throw new Error("Email không hợp lệ");
    }
    if (!/^\d{12}$/.test(citizen_identification_card)) {
      throw new Error("Căn cước công dân không hợp lệ");
    }
    if (!/^(?:.*\s){2,}.*$/.test(name)) {//1 tên phải có 2 từ trở lên
      throw new Error("Tên không hợp lệ");//Hàm trả về catch nếu không thoả điều kiện
    } else {
      const name_check = await Resident.findOne({ where: { name } });
      if (name_check) {
        const name_check1 = await Resident.findOne({ where: { name, citizen_identification_card } });
        if (name_check1) {
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
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getAllResident() {
  try {
    const residents = await Resident.findAll();
    return residents;
  } catch (err) {
    throw new Error("Không có danh sách cư dân");
  }
}

async function find_resident(citizen_identification_card) {
  try {
    if (!/^\d{12}$/.test(citizen_identification_card)) {
      throw new Error("Căn cước công dân không hợp lệ");
    }
    const citizen_identification_card_check = Resident.findOne({ where: { citizen_identification_card } });
    if (citizen_identification_card_check) {
      return citizen_identification_card_check;
    }
  } catch (err) {
    throw new Error("Không tìm thấy cư dân");
  }
}

module.exports = { add_resident, getAllResident, find_resident };
