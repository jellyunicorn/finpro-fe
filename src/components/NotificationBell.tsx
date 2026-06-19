import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notification_bell from "../img/svg/notificationbell.svg";
import { axiosInstance } from "../lib/axios";
import type { notification } from "../lib/types";
import { useState, type Dispatch, type SetStateAction } from "react";



export default function NotificationBell() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { data: notification } = useQuery<notification[]>({
    queryKey: ["notification"],
    queryFn: async () => {
      const result = await axiosInstance.get(`/notification/user`);
      return result.data.data;
    },
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: (notificationId: number) =>
      axiosInstance.patch(`/notification/read/${notificationId}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notification"] }),
  });

  const hasUnread = notification?.some((n) => n.readAt === null);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 border rounded-full border-neutral-300"
      >
        <div className="relative">
          <img src={notification_bell} alt="" />
          {hasUnread && (
            <div className="bg-red-500 w-2 h-2 right-0 top-0 rounded-full absolute" />
          )}
        </div>
      </button>

      <div
        className={`absolute top-12 right-0 z-10 border border-neutral-300 bg-white shadow-md rounded-lg p-3  md:w-100 h-75
        before:content-[''] before:absolute before:-top-1.5 before:right-3.5 before:h-3 before:w-3
        before:rotate-45 before:border-l before:border-t before:border-neutral-300 before:bg-white transition-all ${
          open ? "opacity-100" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        {!notification?.length && (
          <div className="text-neutral-300 w-full h-full flex justify-center items-center">
            No Notification found...
          </div>
        )}
        <div className="overflow-y-auto w-full p-1 h-full scrollbar-thin transition-all ease-in  scrollbar-thumb-blue-300/0  hover:scrollbar-thumb-blue-300">
          {notification?.map((n: notification) => (
            <div
              key={n.notificationId}
              onMouseEnter={() =>
                n.readAt === null && markAsRead(n.notificationId)
              }
              className="flex flex-col relative hover:outline outline-claundry-accent rounded-md p-2 hover:shadow-md transition-shadow ease-in-out shadow-claundry-accent"
            >
              {n.readAt === null && (
                <div className="rounded-full left-0 top-0 w-2 h-2 drop-shadow-xl shadow-red-300 bg-red-500 absolute" />
              )}
              <p className="text-claundry-blue font-medium">
                {n.notification.title}
              </p>
              <p className="text-sm text-neutral-600">{n.notification.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
