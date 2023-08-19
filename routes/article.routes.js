const Router = require("express");
const Article = require("../models/Article.js");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = new Router();
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

router.post(
  "/create",
  [
    check("title", "The title doesn't can be empty ").isLength({ min: 1 }),
    check("text", "The text must be longer then 200 symbols").isLength({
      min: 20,
    }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }

      const { title, userId, name, text } = req.body;
      console.log(req.body);
      const article = new Article({ title, userId, name, text });
      if (article) {
        await article.save();
        return res
          .set("Access-Control-Allow-Origin", "*")
          .json({ message: "Article was created", success: true });
      } else {
        return res
          .set("Access-Control-Allow-Origin", "*")
          .json({ message: "Article was not created" });
      }
    } catch (e) {
      res.send({ message: "Server error" });
    }
  }
);

router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();

    return res.set("Access-Control-Allow-Origin", "*").json(articles);
  } catch (e) {
    res.send({ message: "Server error" });
  }
});

router.get("/articles/:id", async (req, res) => {
  try {
    const articleId = req.params.id;
    console.log(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      return res.status(400).json({
        message: "given object id is not valid",
      });
    } else {
      const article = await Article.findById(articleId);
      if (!article) {
        return res
          .status(404)
          .json({ message: "Article with this id doesn't exist" });
      }

      return res.set("Access-Control-Allow-Origin", "*").send(article);
    }
  } catch (e) {
    res.send({ message: "Server error" });
  }
});
router.put("/articles/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const articleId = req.params.id;
    console.log(req.params.id);
    if (!mongoose?.Types?.ObjectId?.isValid(articleId)) {
      return res.status(400).json({
        message: "given object id is not valid",
      });
    } else {
      const article = await Article.findByIdAndUpdate(
        articleId,
        { title: req.body.title, text: req.body.text },
        { new: true }
      );
      if (!article) {
        return res
          .status(404)
          .json({ message: "Article with this id doesn't exist" });
      }

      return res
        .set("Access-Control-Allow-Origin", "*")
        .set("Access-Control-Allow-Headers", "Content-Type")
        .json({
          article: article,
          message: "Article was updated",
          success: true,
        });
    }
  } catch (e) {
    res.send({ message: "Server error" });
  }
});

router.options("/articles/:id", (req, res) => {
  console.log(req.params.id);
  // Отправьте корректные CORS заголовки и успешный статус код (200)
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send();
});

router.delete("/articles/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const articleId = req.params.id;
    const userId = req.query.id;
    console.log(req.params.userId);
    console.log(req.query.id);
    if (!mongoose?.Types?.ObjectId?.isValid(articleId)) {
      return res.status(400).json({
        message: "given object id is not valid",
      });
    } else {
      const article = await Article.findByIdAndDelete(articleId);
      if (!article) {
        return res
          .status(404)
          .json({ message: "Article with this id doesn't exist" });
      }

      return res
        .set("Access-Control-Allow-Origin", "*")
        .set("Access-Control-Allow-Headers", "Content-Type")
        .json({
          article: article,
          message: "Article was deleted",
          success: true,
        });
    }
  } catch (e) {
    res.send({ message: "Server error" });
  }
});



module.exports = router;
