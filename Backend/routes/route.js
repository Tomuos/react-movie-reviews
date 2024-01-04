import express from "express";
import ReviewsController from "../controllers/review.controller.js"

const router = express.Router();

router.route("/").get((req, res) => res.send("Hello world!"));
router.route("/new").post(ReviewsController.apiPostReview);

export default router;