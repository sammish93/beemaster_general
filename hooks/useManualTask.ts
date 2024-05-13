import { getUser, getUserHives } from "@/domain/db/operations";
import { HiveModel } from "@/models";
import { isPlatformMobile } from "@/utils/identifyPlatform";
import { User } from "@/models"; 
import { useEffect } from "react";
import { evaluateAndSendNotification } from "@/domain/tasks";

interface BackgroundTaskProps {
    userId: string
}

const useManualTask = ({ userId }: BackgroundTaskProps) => {
    
    const startTask = async () => {
        if (isPlatformMobile()) {
          const user = (await getUser(userId)) as User;

          if (user) {
            const hives = await getUserHives(user.id) as HiveModel[];

            // Only do this if user and hives exists.
            if (user && hives) {
              await evaluateAndSendNotification(user, hives);
            }
          }
        } else {
            console.log("Platform is web, no backgroundtask needed.");
        }
    }

    return { startTask };
}

export default useManualTask;