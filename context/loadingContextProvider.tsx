'use client'
import { useState, createContext, type Context, type Dispatch, type SetStateAction } from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

const LoadingContextProvider = ({children} : {children: React.ReactNode}) => {

  const [loading, setLoading] = useState(false);

  return (

    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>

  );
}

export default LoadingContextProvider;