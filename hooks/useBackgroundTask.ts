import { useEffect } from "react";
import { isPlatformMobile } from "@/utils/identifyPlatform";

interface BackgroundTaskProps {
    startBackgroundTask: () => Promise<void>
}

const useBackgroundTask = ({ startBackgroundTask }: BackgroundTaskProps) => {

    useEffect(() => {
        if (isPlatformMobile()) {
          startBackgroundTask()
            .then(() => {
              console.log("Background task registered!");
            })
            .catch((error) => {
              console.error(`Error registering background task: ${error}`);
            });
        } else {
            console.log("Platform is web, no backgroundtask needed.");
        }
      }, []);
}

export default useBackgroundTask;