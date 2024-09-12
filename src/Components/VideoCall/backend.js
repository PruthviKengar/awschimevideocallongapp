const AWS = require('aws-sdk');
const chime = new AWS.Chime({ region: 'us-east-1' });

chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com/console');

// Create meeting
export const createMeeting = async (req, res) => {
  const meetingResponse = await chime.createMeeting({
    ClientRequestToken: uuidv4(), // Unique identifier for the meeting
    MediaRegion: 'us-east-1',
  }).promise();

  // Create attendee
  const attendeeResponse = await chime.createAttendee({
    MeetingId: meetingResponse.Meeting.MeetingId,
    ExternalUserId: uuidv4(),
  }).promise();

  res.json({
    Meeting: meetingResponse.Meeting,
    Attendee: attendeeResponse.Attendee,
  });
};