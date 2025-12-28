const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const { authenticate } = require("../middleware/auth");

router.use(authenticate);

router.get("/", listController.getLists);
router.post("/", listController.createList);
router.put("/:id", listController.updateList);
router.delete("/:id", listController.deleteList);

module.exports = router;
