import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function Videochat() {

    
const myMeeting = async (element) => {
    const appID = 1775122648;
    const serverSecret = "41e6f089a4f5f266318f15e1ac723ba9";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, 3600,Date.now().toString(),"test");
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
    container: element,
    scenario : {
        mode : ZegoUIKitPrebuilt.OneONoneCall

    },

    success: () => {
        console.log('join room success');
    },
    error: (err) => {
        console.error('join room failed', err);
    }
    });



        

}


  return (
   
    <div className="room-page" >
       <div ref={myMeeting } />
    </div>

  )
}

export default Videochat