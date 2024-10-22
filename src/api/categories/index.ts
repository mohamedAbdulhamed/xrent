import { AxiosInstance } from "axios";
import { Category, GetDataResponse } from "../../config/constants";

async function fetchCategories(
  axiosPrivate: AxiosInstance
): Promise<GetDataResponse<Category[]>> {
  try {
    // const response = await axiosPrivate.get("/categories");

    const objectFromAxios = [{id: "1", title: "Dresses"}];

    return { data: objectFromAxios };
  } catch (error) {
    throw error;
  }
}

export { fetchCategories };
