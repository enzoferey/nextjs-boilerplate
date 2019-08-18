import React, { useEffect, useState } from "react";
import axios from "axios";

interface ContextType {
  data: any;
}

export const DataContext = React.createContext<ContextType>({
  data: [],
});

const DataContextWrapper = props => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("/api/players");
    const data = response.data.data;
    setData(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <DataContext.Provider value={{ data }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextWrapper;
