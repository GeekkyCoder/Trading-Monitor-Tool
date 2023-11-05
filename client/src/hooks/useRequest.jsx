import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../components/context/authContext";

const BASE_URL = "https://uk-trader-backend.vercel.app";

const deleteData = async (endpoint, user) => {
  try {
    const { status } = await axios.delete(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (!(status === 200)) {
      throw new Error("Could not delete trades...");
    }
  } catch (err) {
    throw new Error("Oops");
  }
};

const updateData = async (endpoint, payload, user) => {
  try {
    const { data, status } = await axios.put(
      `${BASE_URL}/${endpoint}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (!(status === 201)) {
      throw new Error("Could not update data...");
    }
    return data;
  } catch (err) {
    throw new Error("Oops");
  }
};

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
    if (!(status === 201)) {
      throw new Error("could not post data...");
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("oops");
  }
};

//custom hook for get requests

const useRequest = () => {
  const { user } = useContext(AuthContext);

  const useGet = (endpoint, queryKey) => {
    return useQuery({
      queryKey: queryKey,
      refetchOnMount: "always",
      queryFn: () => fetchData(endpoint, user),
    });
  };

  //custom hook for post request
  const usePost = (endpoint, queryKey) => {
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation({
      mutationFn: (payload) => postData(endpoint, payload, user),
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: queryKey });
        queryClient.invalidateQueries({ queryKey: ["running-trades"] });
        queryClient.invalidateQueries({ queryKey: ["stopped-trades"] });
      },
    });

    return mutation;
  };

  const usePut = (endpoint, queryKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: (payload) => updateData(endpoint, payload, user),
      onSuccess: () => {
        // Invalidate and refetch queries that depend on this data
        queryClient.invalidateQueries({ queryKey: ["running-trades"] });
        queryClient.invalidateQueries({ queryKey: ["stopped-trades"] });
      },
    });

    return mutation;
  };

  const useDelete = (endpoint, queryKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: () => deleteData(endpoint, user),
      onSuccess: () => {
        // Invalidate and refetch queries that depend on this data
        queryClient.invalidateQueries({ queryKey: ["running-trades"] });
        queryClient.invalidateQueries({ queryKey: ["stopped-trades"] });
      },
    });

    return mutation;
  };

  return {
    useGet,
    usePost,
    usePut,
    useDelete,
  };
};

export default useRequest;
