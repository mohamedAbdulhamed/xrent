import { AxiosInstance } from "axios";

interface DataResponse<T> {
  data: T[];
}

async function fetchCategories(
  axiosPrivate: AxiosInstance
): Promise<DataResponse<string>> {
  try {
    // const response = await axiosPrivate.get("/categories");

    const objectFromAxios = ["Dresses"];

    return { data: objectFromAxios };
  } catch (error) {
    throw error;
  }
}

export { fetchCategories };
