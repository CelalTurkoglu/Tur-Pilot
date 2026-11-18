"use client";

import React from "react";
import { useDemoModal } from "./DemoModal";

export function DemoTriggerButton({
  label = "Görüşme Planla",
  sourceLabel,
  className,
}: {
  label?: string;
  sourceLabel?: string;
  className?: string;
}) {
  const { openDemoModal } = useDemoModal();
  return (
    <button
      type="button"
      onClick={() => openDemoModal(sourceLabel || label)}
      className={className}
    >
      {label}
    </button>
  );
}
