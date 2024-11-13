import express from 'express';
import { User } from '../models/userModel.js';
import { updateUserProfile } from '../controllers/userControllers.js';
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Lấy thông tin người dùng qua userId
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    const { password, ...userData } = user._doc; // Ẩn password trước khi trả về
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error });
  }
});

// Cập nhật thông tin người dùng qua userId (avatar và các trường khác)
router.put('/users/:id', upload.single('avatar'), updateUserProfile);

router.put('/users/:id', async (req, res) => {
    try {
    // Lấy userId từ cookie
    const userId = req.Cookies.userId;
    

    // Kiểm tra nếu không có userId
    if (!userId) {
      return res.status(400).json({ message: 'Thiếu userId trong cookie' });
    }

    // Thu thập dữ liệu từ form body
    const updatedFields = {
      username: req.body.username,
      dob: req.body.dob,
      name: req.body.name,
      description: req.body.description,
    };

    // Chỉ cập nhật mật khẩu nếu có trong yêu cầu
    if (req.body.password) {
      updatedFields.password = req.body.password;
    }

    // Nếu có file avatar, lưu vào Buffer
    if (req.file) {
      updatedFields.avatar = req.file.buffer;
    }

    // Tìm người dùng theo userId và cập nhật thông tin
    const user = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true, // Trả về dữ liệu người dùng mới sau khi cập nhật
      runValidators: true, // Chạy các validation trên schema
    });

    // Nếu người dùng không tồn tại
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Loại bỏ password khỏi dữ liệu phản hồi
    const { password, ...userData } = user._doc;
    res.status(200).json({ message: 'Cập nhật thông tin thành công', user: userData });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})
    
export default router;
