  import { User } from "../models/userModel.js";
  import jwt from 'jsonwebtoken';
  import { taoToken } from "../middlewares/authMiddleware.js";
  import bcrypt from 'bcrypt'; // Thêm bcrypt để mã hóa mật khẩu
  import { verifyToken } from "../middlewares/authMiddleware.js"; // Thêm middleware xác thực
  import Cookies from 'js-cookie'

  // controllers/userControllers.js
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm kiếm người dùng theo ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Cập nhật thông tin người dùng
    user.username = req.body.username || user.username;
    user.description = req.body.description || user.description;
    if (req.file) {
      user.avatar = req.file.buffer.toString('base64'); // Lưu avatar từ buffer
    }
 
    // Lưu lại người dùng đã cập nhật
    await user.save();

    return res.status(200).json({ message: "Cập nhật thông tin thành công", user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};

  export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }

      // So sánh mật khẩu trực tiếp (không mã hóa)
      if (password !== user.password) {
        return res.status(401).json({ message: 'Sai mật khẩu' });
      }
  
      return res.status(200).json({
        message: 'Đăng nhập thành công',
        
        userId: user._id, // Thêm userId vào phản hồi
      });
      
    } catch (error) {
      return res.status(500).json({ message: 'Đã có lỗi xảy ra' });
    }
  };


