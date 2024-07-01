"use client"

import Image from 'next/image'
import LodgesPage from './lodges/LodgesPage'
import React, { useState } from "react";


export default function Home() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const NotificationShow = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <div>
      <LodgesPage />
      {isNotificationOpen && (
        <div className="fixed">
          <div>hjdfh</div>
        </div>
      )}
    </div>
  );
}
