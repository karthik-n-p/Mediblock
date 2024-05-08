import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import Prescription from "./Prescription"; // Import the Prescription component

function Videochat() {
  const { roomId } = useParams();
  const elementRef = useRef(null);
  const appID = import.meta.env.VITE_APP_ID1;
  const serverSecret = import.meta.env.VITE_SERVER_SECRET;
  

  useEffect(() => {
    const meeting = async () => {

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "test"
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: elementRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:5173/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
        showRoomTimer: true,
        // onReturnToHomeScreenClicked?: () => void; // When the "Return to home screen" button is clicked, this callback is triggered. After setting up this callback, clicking the button will not navigate to the home screen; instead, you can add your own page navigation logic here.
      });
    };

    meeting();
  }, [roomId]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "115px" }}>
      <div style={{ flex: 1 }}>
        <div ref={elementRef}></div>
      </div>
      <div style={{ flex: 1 }}>
        <Prescription /> {/* Render the Prescription component */}
      </div>
    </div>
  );
}

export default Videochat;
