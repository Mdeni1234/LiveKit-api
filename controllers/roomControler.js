const { AccessToken, RoomServiceClient, Room } = require("livekit-server-sdk");
require('dotenv').config();

const liveitHost = "https://video-call-m23damml.livekit.cloud";
const roomService = new RoomServiceClient(
  liveitHost,
  process.env.API_KEY,
  process.env.SECRET_KEY
);
const createToken = (req, res) => {
  const roomName = req.body.roomName;
  const participantName = req.body.participant;
  const at = new AccessToken(process.env.API_KEY, process.env.SECRET_KEY, {
    identity: participantName,
  });
  at.addGrant({ roomJoin: true, room: roomName });
  const token = at.toJwt();
  res.status(200).json(token);
};

const createRoom = (req, res) => {
  let count = req.body.room;
  const options = {
    name: `Rooms ${count}`,
    empetyTimout: 60 * 10,
    maxParticipants: 2,
  };
  try {
    roomService.createRoom(options).then((room) => {
      console.log("rooms created");
      res.status(200).json(room);
    });
  } catch (error) {
    console.log(error);
  }
};

const listRooms = (req, res) => {
  try {
    roomService.listRooms().then((rooms) => {
      console.log("Show Rooms");
      res.status(200).json(rooms);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteRoom = (req, res) => {
  const roomName = req.roomName;
  try {
    roomService.deleteRoom(roomName).then(() => {
      res.status(200).json({ message: "Room deleted" });
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = { createRoom, createToken, listRooms, deleteRoom };
