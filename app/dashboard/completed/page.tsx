"use client";
import TasksContainer from "@/components/TasksContainer";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Completed = () => {
  const [taskList, setTaskList] = useState<any>([]);

  const fetchTaskList = async () => {
    const response = await axios.get("/api/taskslist/completed");
    const data = await response.data;
    setTaskList(data);
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <div className="flex-1 bg-[#212121] border-2 border-[#323232] rounded-2xl  py-4">
      <TasksContainer title={"Completed"} taskList={taskList} />
    </div>
  );
};

export default Completed;
