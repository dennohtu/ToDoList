import React, { useEffect, useState } from "react";
import Card from "./component/Card";
import AddTodo from "./component/AddTodo";
import getToken from "./auth.Service";
import axios from "axios";

const Dashboard = () => {
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [resolved, setResolved] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const comparefn = (a, b) => {
    const aMils = new Date(a.createdAt).getTime();
    const bMils = new Date(b.createdAt).getTime();

    if (aMils < bMils) return 1;
    else if (aMils > bMils) return -1;
    else return 0;
  };
  const fetchData = async () => {
    const token = getToken();

    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks/getAll",
        {
          headers: {
            Authorization: `jwt ${token}`,
          },
        }
      );
      const data = response.data.data;
      setTodo(data.filter((task) => task.status === "new").sort(comparefn));
      setOngoing(
        data.filter((task) => task.status === "ongoing").sort(comparefn)
      );
      setResolved(
        data.filter((task) => task.status === "done").sort(comparefn)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <AddTodo fetchData={fetchData} />
      <Card
        todo={todo}
        setTodo={setTodo}
        ongoing={ongoing}
        setOngoing={setOngoing}
        resolved={resolved}
        setResolved={setResolved}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Dashboard;
