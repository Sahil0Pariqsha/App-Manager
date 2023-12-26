import React, { useEffect, useState } from "react";
import axios from "axios";
import TasksContainer from "@/components/TasksContainer";

export default function DashboardTemp({ taskList }: any) {
  return (
    <>
      <TasksContainer title={"All Tasks"} taskList={taskList} loading={false} />
    </>
  );
}
