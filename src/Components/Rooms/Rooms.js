import React, { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import "./Rooms.css";
import { useSelector } from "react-redux";
import {
  getAvailableMeetingRooms,
  getAvailableRoomsInBuilding,
} from "../../store/meetingSlice";

const Rooms = ({ show, onSave, building, slot }) => {
  //   const [show, setShow] = useState(false);
  //   const availableRooms = useSelector(getAvailableMeetingRooms);
  const availableRooms = useSelector((state) =>
    getAvailableRoomsInBuilding(slot, building, state)
  );
  const [selectedRoom, setSelectedRoom] = useState({});

  const onRoomChange = (room) => {
    setSelectedRoom(room);
  };

  const saveMeeting = (event) => {
    event.preventDefault();
    onSave(selectedRoom);
    setSelectedRoom({});
  };
  return (
    <>
      <ModalWindow
        title="Please select one of the Free Rooms"
        show={show}
        // onClose={() => setShow(false)}
        isNext={false}
      >
        <form
          className="new-meeting-container"
          onSubmit={(e) => {
            saveMeeting(e);
          }}
        >
          <ul className="list">
            {availableRooms.length ? (
              availableRooms.map((room) => (
                <li
                  key={room.id}
                  className={`list-item ${
                    room.name === selectedRoom.name ? "selected" : ""
                  }`}
                  onClick={() => onRoomChange(room)}
                >
                  <span>{room.name}</span>
                  <span>
                    <strong>{building}</strong>
                  </span>
                  <span>
                    <strong>Floor: </strong>
                    {room.floor}
                  </span>
                </li>
              ))
            ) : (
              <span>No Rooms Available in {building}</span>
            )}
          </ul>
          <div className="center">
            <button type="submit" className="nxt-button" value={"submit"}>
              Save
            </button>
          </div>
        </form>
      </ModalWindow>
    </>
  );
};

export default Rooms;
