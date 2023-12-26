"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TasksContainer from "@/components/TasksContainer";

export default function Dashboard() {
  const [taskList, setTaskList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTaskList = async () => {
    const response = await axios.get("/api/taskslist");
    const data = await response.data;
    setTaskList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <>
      <TasksContainer title={"All Tasks"} taskList={taskList} loading={loading} />
    </>
  );
}
