//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MTZkYjQyNC00NGFmLTQ0YTUtYjBlNS1kZTJiMzY0YzJmNjEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNjY0NDA1MSwiZXhwIjoxNzI3MjQ4ODUxfQ.ho4eibal7aGRO5ymK_PZZrZlC4nhnyXjFHRUpZZcbeg";
// API call to create a meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};                                                      