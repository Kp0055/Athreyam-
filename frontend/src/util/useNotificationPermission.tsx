// src/utils/useNotificationPermission.ts
import { useEffect } from "react";

export function useNotificationPermission() {
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
    } else if (Notification.permission === "default") {
      console.log("Requesting notification permission...");
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    } else {
      console.log("Notification permission already:", Notification.permission);
    }
  }, []);
}
