"use client";

import Image from "next/image";
import LodgesPage from "./lodges/LodgesPage";
import React, { useState } from "react";

export default function Home() {
  return (
    <div>
      <LodgesPage />
    </div>
  );
}
