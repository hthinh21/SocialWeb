  import express from 'express';
  import { User } from '../models/userModel.js';
  import { searchUsers, 
          userProfile,
          userFollowerandFollowingData,
          followandUnfollowUser,
          getNotifications,
          loginUser}
          from '../controllers/userControllers.js';
  import { updateUserProfile } from "../controllers/userControllers.js";
  import { upload } from "../middlewares/upload.js"; 
  import { authMiddleware } from "../middlewares/authMiddleware.js";
import { get } from 'mongoose';
  const router = express.Router();

  router.get('/notification/:id', authMiddleware,getNotifications); 
  router.post('/follow/:id', authMiddleware, followandUnfollowUser);
  router.get("/followdata/:id", authMiddleware, userFollowerandFollowingData);
  router.get('/profile/:id', authMiddleware, userProfile);
  router.put('/:id', upload.single('avatar'), updateUserProfile);
  router.get("/all", authMiddleware, searchUsers);
  // Route đăng nhập
  router.post('/login', loginUser);

  // Route for Register
  router.post('/', async (request, response) => {
    try {
      if (
        !request.body.username ||
        !request.body.password ||
        !request.body.dob ||
        !request.body.name ||
        !request.body.email
      ) {
        return response.status(400).send({
          message: 'Send all required fields: username, password, age, name',
        });
      }
      if(request.body.avatar && request.body.description){
        const newUser = {
          username: request.body.username,
          password: request.body.password,
          dob: request.body.dob,
          name: request.body.name,
          email: request.body.email,
          description: request.body.description,
          avatar: request.body.avatar
        };
        const user = await User.create(newUser);

        return response.status(201).send(user);
      }
      if(!request.body.description && !request.body.description){
        const newUser = {
          username: request.body.username,
          password: request.body.password,
          dob: request.body.dob,
          name: request.body.name,
          email: request.body.email,
          description: "",
          avatar: ""
        };
        const user = await User.create(newUser);

        return response.status(201).send(user);
      }
      else{
        if(request.body.description){
          const newUser = {
            username: request.body.username,
            password: request.body.password,
            dob: request.body.dob,
            name: request.body.name,
            email: request.body.email,
            description: request.body.description,
            avatar: ""
          };
          const user = await User.create(newUser);
    
          return response.status(201).send(user);
        }
        else{
          const newUser = {
            username: request.body.username,
            password: request.body.password,
            dob: request.body.dob,
            name: request.body.name,
            email: request.body.email,
            description: "",
            avatar: request.body.avatar
          };
          const user = await User.create(newUser);
    
          return response.status(201).send(user);
        }
      }
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Get All Users from database
  router.get('/', async (request, response) => {
    try {
      const users = await User.find({});

      return response.status(200).json({
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Get One User from database by id
  router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;

      const user = await User.findById(id);

      return response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Update a User
  // router.put('/:id', async (request, response) => {
  //   try {
  //     if (
  //         !request.body.username ||
  //         !request.body.password ||
  //         !request.body.dob ||
  //         !request.body.name
  //     ) {
  //       return response.status(400).send({
  //         message: 'Send all required fields: username, password, age, name',
  //       });
  //     }

  //     const { id } = request.params;

  //     const result = await User.findByIdAndUpdate(id, request.body);

  //     if (!result) {
  //       return response.status(404).json({ message: 'User not found' });
  //     }

  //     return response.status(200).send({ message: 'User updated successfully' });
  //   } catch (error) {
  //     console.log(error.message);
  //     response.status(500).send({ message: error.message });
  //   }
  // });

  // Route for Delete a User
  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;

      const result = await User.findByIdAndDelete(id);

      if (!result) {
        return response.status(404).json({ message: 'User not found' });
      }

      return response.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  //Get user by username

  router.get('/username/:username', async (request, response) => {
    try {
      const { username } = request.params;
      const user = await User.findOne({ username });
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
      response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  export default router;