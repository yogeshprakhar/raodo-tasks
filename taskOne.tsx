// Usage Example
const users: User[] = [
  {
    userId: 1,
    username: "Yogesh Prakhar",
    devices: [
      {
        deviceId: "device_1",
        loggedIn: new Date(2024, 5, 10),
        loggedOut: null,
        lastSeenAt: new Date(2024, 6, 3),
      }, // Logged in during June
      {
        deviceId: "device_2",
        loggedIn: new Date(2024, 4, 20),
        loggedOut: new Date(2024, 4, 22),
        lastSeenAt: null,
      }, // Logged in April
    ],
  },
  {
    userId: 2,
    username: "Pranjal Singh",
    devices: [
      {
        deviceId: "device_3",
        loggedIn: new Date(2024, 5, 25),
        loggedOut: null,
        lastSeenAt: new Date(2024, 6, 6),
      }, // Logged in during June
      {
        deviceId: "device_4",
        loggedIn: new Date(2024, 5, 1),
        loggedOut: new Date(2024, 5, 3),
        lastSeenAt: null,
      }, // Logged in May
    ],
  },
  {
    userId: 3,
    username: "Shishir Bhargav",
    devices: [
      {
        deviceId: "device_5",
        loggedIn: new Date(2024, 3, 15),
        loggedOut: new Date(2024, 3, 17),
        lastSeenAt: null,
      }, // Logged in March
    ],
  },
];

interface User {
  userId: number;
  username?: string;
  devices: Device[];
}

interface Device {
  deviceId: string;
  loggedIn: Date | null;
  loggedOut: Date | null;
  lastSeenAt: Date | null;
}

// function to get monthly logged in users
function getMonthlyLoggedInUsers(users: User[], targetMonth: Date): User[] {
  const filteredUsers = users.filter((user) => {
    return user.devices.some((device) => {
      const loginTime = device.loggedIn;
      const logoutTime = device.loggedOut;

      if (!loginTime) {
        return;
      }
      // Check if the login time is within the target month and year
      const isSameMonthAndYear =
        loginTime.getMonth() === targetMonth.getMonth() &&
        loginTime.getFullYear() === targetMonth.getFullYear();

      return isSameMonthAndYear;
    });
  });

  return filteredUsers;
}

// function to get end of month active users
function getEndOfMonthActiveUsers(users: User[], targetMonth: Date): number {
  const filteredUsers = getMonthlyLoggedInUsers(users, targetMonth);
  return filteredUsers.filter((user) => {
    return user.devices.some(
      (device) =>
        device.loggedIn &&
        (device.loggedOut
          ? device.loggedOut.getMonth() === targetMonth.getMonth()
          : false)
    );
  }).length;
}

const targetMonth = new Date(2024, 5); // May 2024

const monthlyLoggedIn = getMonthlyLoggedInUsers(users, targetMonth);
const endOfMonthActive = getEndOfMonthActiveUsers(users, targetMonth);

console.log(`Monthly Logged-in Users: ${monthlyLoggedIn.length}`);
console.log(`End-of-Month Active Users: ${endOfMonthActive}`);
