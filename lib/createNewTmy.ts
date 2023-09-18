import { FetchedITmy } from "@/types";
import { toast } from "react-toastify";

export const createNewTmy = async (data:FetchedITmy) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
          },
      });
      const createdTMY = await response.json();
      toast.success("TMY created successfully. You can download it on the sidebar")
      return createdTMY;
    } catch (error) {
      toast.error("Error creating. Retry later")
      console.log(error);
      return error;
    }
  };
  