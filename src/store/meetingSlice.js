import {
  compareWithCurrentDate,
  checkCurrentTimeIsInGivenRange,
  checkSlotAvailability,
} from "../utils/helper";

const initialState = {
  buildings: [
    {
      name: "Building 8",
      meetingRooms: [
        {
          name: "Punjab",
          floor: 7,
          meetings: [
            {
              title: "Booked for Interview",
              date: "17/06/2022",
              startTime: "19:00",
              endTime: "20:00",
            },
          ],
        },
        {
          name: "Ganga",
          floor: 8,
          meetings: [
            {
              title: "Booked for Interview",
              date: "17/06/2022",
              startTime: "01:00",
              endTime: "01:55",
            },
          ],
        },
      ],
    },
    {
      name: "Building 4",
      meetingRooms: [],
    },
    {
      name: "Building 6",
      meetingRooms: [],
    },
  ],
  meetingRooms: [
    {
      name: "Punjab",
      floor: 7,
      building: {
        name: "Building 8",
      },
      meetings: [
        {
          title: "Booked for Interview",
        },
      ],
    },
    {
      name: "Ganga",
      floor: 8,
      building: {
        name: "Building 8",
      },
      meetings: [
        {
          title: "Booked for Interview",
        },
      ],
    },
  ],
};

const meetingSlice = (state = initialState, action) => {
  switch (action.type) {
    case "meetings/addMeeting":
      const buildings = state.buildings.map((building) => {
        building.meetingRooms.forEach((room) => {
          if (room.name === action.payload.name)
            room.meetings.push(action.payload);
          return room;
        });
        return building;
      });
      return { ...state, buildings: buildings };
    //   return state;
    default:
      return state;
  }
};

export const getAllBuildings = (state) => state.buildings;
export const getAllMeetingRooms = (state) => {
  let meetingRooms = [];
  state.buildings.forEach((building) => {
    if (building.meetingRooms.length)
      meetingRooms = [...meetingRooms, ...building.meetingRooms];
  });
  return meetingRooms;
};

export const getAvailableMeetingRooms = (state) => state.meetingRooms;

export const getAvailableRoomsInBuilding = (
  desiredSlot,
  buildingName,
  state
) => {
  let availRooms = [];
  //   const unavailRooms = [];
  state.buildings.forEach((building) => {
    if (building.name === buildingName) {
      building.meetingRooms.forEach((room) => {
        var isSlotAvailable;
        for (let i = 0; i < room.meetings.length; i++) {
          const date = room.meetings[i].date;
          const unavailableSlot = [
            room.meetings[i].startTime,
            room.meetings[i].endTime,
          ];
          isSlotAvailable = true;
          if (
            compareWithCurrentDate(date) &&
            checkSlotAvailability(desiredSlot, unavailableSlot)
          ) {
            isSlotAvailable = false;
            break;
          }
        }
        if (isSlotAvailable) availRooms.push(room);
        // room.meetings.forEach((meeting) => {
        //   if (
        //     compareWithCurrentDate(meeting.date) &&
        //     !checkCurrentTimeIsInGivenRange([
        //       meeting.startTime,
        //       meeting.endTime,
        //     ])
        //   )
        //     availRooms.push(room);
        //   else unavailRooms.push(room.name);
        // });
      });
    }
  });
  //   availRooms = availRooms.filter(
  //     (room) => unavailRooms.indexOf(room.name) === -1
  //   );
  return availRooms;
};

export default meetingSlice;
