import React from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import "./Home.css";
import { useState } from "react";
import Rooms from "../Rooms/Rooms";
import { useSelector, useDispatch } from "react-redux";
import { getAllBuildings, getAllMeetingRooms } from "../../store/meetingSlice";
import {
  compareWithCurrentDate,
  checkCurrentTimeIsInGivenRange,
} from "../../utils/helper";

const Home = () => {
  const buildings = useSelector(getAllBuildings);
  const meetingRooms = useSelector(getAllMeetingRooms);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [isRoomShow, setIsRoomShow] = useState(false);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [building, setBuilding] = useState("");
  // const currentDate = new Date();
  const resetState = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setBuilding("");
  };

  const addMeeting = (room) => {
    setIsRoomShow(false);
    resetState();
    const [yy, mm, dd] = date.split("-");
    const formattedDate = `${dd}/${mm}/${yy}`;
    dispatch({
      type: "meetings/addMeeting",
      payload: {
        name: room.name,
        id: Math.random(),
        title: "Booked3",
        date: formattedDate,
        startTime: startTime,
        endTime: endTime,
        meetingRoomId: 1,
      },
    });
  };

  const convertToCamelCase = (word) => {
    return word
      .split("")
      .map((c, i) => {
        if (i === 0) return c.toUpperCase();
        return c;
      })
      .join("");
  };

  const getLiveMeeting = () => {
    const liveData = {
      live: 0,
      free: 0,
    };
    meetingRooms.forEach((room) => {
      room.meetings.forEach((meeting) => {
        const inRange = checkCurrentTimeIsInGivenRange([
          meeting.startTime,
          meeting.endTime,
        ]);
        const isDateEqual = compareWithCurrentDate(meeting.date);
        if (isDateEqual && inRange) liveData.live++;
        if (isDateEqual && !inRange) liveData.free++;
      });
    });
    return liveData;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth() + 1;
    const years = currentDate.getFullYear();
    const months = monthIndex < 10 ? "0" + monthIndex : monthIndex;

    const date =
      currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : currentDate.getDate();
    return `${years}-${months}-${date}`;
  };
  return (
    <>
      <div className="container">
        <div className="container-body">
          <div className="buildings box">
            <div className="header">
              <span>Buildings</span>
            </div>
            <div className="body">
              <span>Total: {buildings.length}</span>
            </div>
          </div>
          <div className="rooms box">
            <div className="header">
              <span>Rooms</span>
            </div>
            <div className="body">
              <span>Total {meetingRooms.length}</span>
              <span>Free Now {getLiveMeeting().free}</span>
            </div>
          </div>
          <div className="meetings box">
            <div className="header">
              <span>Meetings</span>
            </div>
            <div className="body">
              <span>
                Total {getLiveMeeting().free + getLiveMeeting().live} Today
              </span>
              <span>Total {getLiveMeeting().live} Going on Now</span>
            </div>
          </div>
        </div>
        <div className="container-footer">
          <button className="add-btn" onClick={() => setShow(true)}>
            Add a Meeting
          </button>
        </div>
      </div>
      <ModalWindow
        title="Add Meeting"
        show={show}
        onClose={() => {
          setShow(false);
          resetState();
        }}
        isNext={false}
      >
        <form
          className="new-meeting-container"
          onSubmit={(e) => {
            e.preventDefault();
            setIsRoomShow(true);
            setShow(false);
          }}
        >
          <div className="row">
            <label htmlFor="date" className="date">
              Date
            </label>
            <input
              required
              type="date"
              id="date"
              name="date"
              min={getCurrentDate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="row">
            <label htmlFor="start-time">Start Time</label>
            <input
              required
              type="time"
              id="start-time"
              name="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="end-time" className="end-time">
              End Time
            </label>
            <input
              required
              type="time"
              id="end-time"
              name="end-time"
              min={startTime}
              disabled={!startTime ? true : false}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="row">
            <select
              required
              className="select"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            >
              <option value="">Select Building</option>
              {buildings.map((building) => (
                <option key={building.name} value={building.name}>
                  {convertToCamelCase(building.name)}
                </option>
              ))}
              {/* <option value="A">Select Building</option>
              <option value="A">Building 1</option>
              <option value="B">Building 2</option>
              <option value="C">Building 3</option>
              <option value="C">Building 3</option> */}
            </select>
          </div>
          <div className="center">
            <button type="submit" className="nxt-button" value={"submit"}>
              Next
            </button>
          </div>
        </form>
      </ModalWindow>
      <Rooms
        show={isRoomShow}
        onSave={addMeeting}
        building={building ? building : ""}
        slot={[startTime, endTime]}
      />
    </>
  );
};

export default Home;
