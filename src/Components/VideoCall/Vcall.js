import React, { useEffect, useState } from 'react';
import {
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  ConsoleLogger,
  MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';

const VideoCall = () => {
  const [meetingSession, setMeetingSession] = useState(null);

  useEffect(() => {
    // Fetch meeting and attendee data from your backend
    const fetchMeetingData = async () => {
      const response = await fetch('/create-meeting');
      const data = await response.json();

      const logger = new ConsoleLogger('ChimeMeetingLogs', LogLevel.INFO);
      const deviceController = new DefaultDeviceController(logger);
      const meetingSessionConfiguration = new MeetingSessionConfiguration(
        data.Meeting,
        data.Attendee
      );

      const session = new DefaultMeetingSession(
        meetingSessionConfiguration,
        logger,
        deviceController
      );

      setMeetingSession(session);
    };

    fetchMeetingData();
  }, []);

  const startVideo = () => {
    if (meetingSession) {
      const videoElement = document.getElementById('video-element');
      meetingSession.audioVideo.bindVideoElement(1, videoElement);
      meetingSession.audioVideo.startLocalVideoTile();
    }
  };

  return (
    <div>
      <video id="video-element" style={{ width: '500px', height: '300px' }}></video>
      <button onClick={startVideo}>Start Video Call</button>
    </div>
  );
};

export default VideoCall;