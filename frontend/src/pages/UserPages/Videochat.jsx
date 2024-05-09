import React, { useContext, useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import Prescription from "./Prescription"; // Import the Prescription component
import AuthContext from "./AuthContext";
import { auth } from "./firebase-auth";

function Videochat() {
  const { roomId } = useParams();
  const elementRef = useRef(null);
  
  const appID = parseInt( import.meta.env.VITE_APP_ID1);
  const user = JSON.parse(localStorage.getItem('authData'));

  const isdoctor = user.isdoctor;


  const { username } = React.useContext(AuthContext);
  console.log("d",username);


    
      
  const serverSecret = import.meta.env.VITE_SERVER_SECRET;
  useEffect(() => {
    const meeting = async () => {
 
     
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        username,
       
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: elementRef.current,
    
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
      {isdoctor && ( 
      <div style={{ flex: 1, display: isdoctor?"block": "none" }  }>
        <Prescription />
      </div>
      )}
    </div>
     
  );
}

export default Videochat;
