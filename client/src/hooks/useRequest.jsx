import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const fetchData = async (endpoint) => {
  const { data } = await axios.get(`${BASE_URL}/${endpoint}`);
  return data;
};

export const postData = async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(!response.ok) {
        throw new Error("oops")
      } 
      return response.json();
    } catch (err) {
      throw new Error("oops")
    }
  };
  

//custom hook for get requests
export const useGet = (endpoint, queryKey) => {
  const queryKeyValue =
    typeof queryKey === "object" ? [...queryKey] : [queryKey];

  return useQuery({
    queryKey: queryKeyValue,
    queryFn: () => fetchData(endpoint),
    refetchOnMount: true,
    retryOnMount: true,
  });
};

//custom hook for post request
export const usePost = (endpoint, querykey) => {
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: (data) => postData(endpoint, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [querykey] });
    },
  });

  return mutation;
};
