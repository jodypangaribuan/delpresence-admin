"use client";

import React from "react";
import ClickSpark from "./ClickSpark";

interface ClickSparkProviderProps {
  children: React.ReactNode;
}

export default function ClickSparkProvider({
  children,
}: ClickSparkProviderProps) {
  return (
    <ClickSpark
      sparkColor="#0687C9"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={10}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      {children}
    </ClickSpark>
  );
}
