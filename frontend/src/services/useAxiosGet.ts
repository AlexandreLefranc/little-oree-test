// Libraries import
import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Service import
import { useDisconnectApp } from "./useDisconnectApp";

// useAxiosPost : return tools to send POST request and handle error messages
export const useAxiosGet = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { disconnectApp } = useDisconnectApp();

  // axiosPostRequest : send POST request and handle error cases
  const axiosGetRequest = async <T>(
    URL: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<T> | void> => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get<T>(URL, config);
      setIsLoading(false);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // Error case #1 : client receives an error response (5xx, 4xx)
      if (axiosError.response) {
        // Case #1.1 : user is unauthorized and we want to redirect him to the login page
        if (axiosError.response.status === 401) {
          setErrorMessage(
            axiosError.response?.data?.message || "Non autorisé."
          );

          disconnectApp(); // Reset user authorization info -> redirect the user to the login page
          setIsLoading(false);
          return;
        }

        // Case #1.2 : all the other cases :
        setErrorMessage(
          typeof axiosError.response?.data?.message === "string"
            ? axiosError.response?.data?.message
            : "Une erreur est survenue coté serveur."
        );
        setIsLoading(false);
        return;
      }

      // / Error case #2 : client never receives a response, or request never left
      if (axiosError.request) {
        setErrorMessage(
          typeof axiosError.request.data === "string"
            ? axiosError.request.data
            : "Erreur serveur, merci de réessayer."
        );
        setIsLoading(false);
        return;
      }

      // / Error case #3 : Fallback error message
      setErrorMessage("Une erreur est survenue, merci de réessayer.");
      setIsLoading(false);
    }
  };

  return { axiosGetRequest, isLoading, errorMessage };
};
