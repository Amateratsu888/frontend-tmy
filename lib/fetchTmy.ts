import { toast } from 'react-toastify';
export const fetchTmy = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "GET",
    });
    const fetchTMY = await response.json();
    const formattedTmy = fetchTMY.map((tmy:any) => {
        const newTmy = {
            id: tmy._id.$oid,
            ...tmy,
        }
        delete newTmy._id
        return newTmy;
    })
    return formattedTmy;
  } catch (error) {
    toast.error("error fetching")
    return error;
  }
};
