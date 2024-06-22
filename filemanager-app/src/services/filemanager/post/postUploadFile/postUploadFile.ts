import axiosInstance from "@/services/axios";

export const postUploadFile = async (form: FormData) => {
  return await axiosInstance.post("/filemanager/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
