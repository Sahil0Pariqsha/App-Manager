"use client";
import TasksContainer from "@/components/TasksContainer";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Important = () => {
  const [taskList, setTaskList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTaskList = async () => {
    const response = await axios.get("/api/taskslist/important");
    const data = await response.data;
    setTaskList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <div className="flex-1 bg-[#212121] border-2 border-[#323232] rounded-2xl">
      <TasksContainer
        title={"Important"}
        taskList={taskList}
        loading={loading}
      />
    </div>
  );
};

export default Important;
