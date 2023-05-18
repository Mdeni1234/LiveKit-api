const Router = require("express");
const {
  createRoom,
  createToken,
  deleteRoom,
  listRooms,
} = require("../controllers/roomControler");
const router = Router();

router.get("/rooms", listRooms);
router.post("/token", createToken);
router.post("/room", createRoom);
router.delete("/room", deleteRoom);

module.exports = router;
