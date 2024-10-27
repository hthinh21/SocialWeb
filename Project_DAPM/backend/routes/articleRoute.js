import express from 'express';
import { Article } from '../models/articleModel.js';

const router = express.Router();

// Route for Create Article
router.post('/', async (request, response) => {
    try {
      if (
        !request.body.description ||
        !request.body.userID
      ) {
        return response.status(400).send({
          message: 'Send all required fields: User, Publish Date, Description',
        });
      }
      else{
        const newArticle = {
            description: request.body.description,
            userID: request.body.userID
          };
          const article = await Article.create(newArticle);

          return response.status(201).send(article);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

//Route for Get All Article
router.get('/:user_ID', async (request, response) => {
    try {
        const { user_ID } = request.params;
        const articles = await Article.find({userID: user_ID});

        return response.status(200).json({
        count: articles.length,
        data: articles,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default router;