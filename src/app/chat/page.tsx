import React from "react";
import DesktopChat from "./DesktopChat";

function Chat() {
  return (
    <div>
      <div className="lg:block hidden">
        <DesktopChat />
      </div>
      <div className="lg:hidden">Mobile chat</div>
    </div>
  );
}

export default Chat;
