import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get('/Account/refresh-token', {
        withCredentials: true,
      });

      if (response?.data?.Success && response?.data?.StatusCode === 200)
      {
        const token = response?.data?.Result?.token;
        const user = response?.data?.Result?.user;

        if (!token || !user) return null;

        setAuth({ user, token });

        return token;
      }
    } catch (err) {
      console.error("Failed to refresh token:", err);
    }
    return null;
  }

  return refresh;
}

export default useRefreshToken;
