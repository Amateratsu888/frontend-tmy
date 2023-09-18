import { toast } from 'react-toastify';
export const deleteTmy = async (id:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: "DELETE",
    });
    const deletedFetchTMY = await response.json();
    toast.success("TMY deleted successfully")
    return deletedFetchTMY;
  } catch (error) {
    toast.error("Error deleting")
    return error;
  }
};
