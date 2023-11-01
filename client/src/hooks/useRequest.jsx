import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../components/context/authContext";

const BASE_URL = "http://localhost:8000";

const fetchData = async (endpoint, user) => {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (!(status === 200)) {
      throw new Error("could not fetch data...");
    }
    return data;
  } catch (err) {
    throw new Error("oops");
  }
};

const postData = async (endpoint, payload, user) => {
  try {
    const { data, status } = await axios.post(
      `${BASE_URL}/${endpoint}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (!(status === 200)) {
      throw new Error("could not post data...");
    }
    return data;
  } catch (err) {
    throw new Error("oops");
  }
};

//custom hook for get requests

const useRequest = () => {
  const { user } = useContext(AuthContext);

  const useGet = (endpoint, queryKey) => {
    const queryKeyValue =
      typeof queryKey === "object" ? [...queryKey] : [queryKey];

    return useQuery({
      queryKey: queryKeyValue,
      queryFn: () => fetchData(endpoint, user),
      refetchOnMount: true,
      retryOnMount: true,
    });
  };

  //custom hook for post request
  const usePost = (endpoint, querykey) => {
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation({
      mutationFn: (payload) => postData(endpoint, payload, user),
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: [querykey] });
      },
    });

    return mutation;
  };

  return {
    useGet,
    usePost,
  };
};

export default useRequest;
