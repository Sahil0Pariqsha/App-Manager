"use client";
import React, { useEffect, useState } from "react";
import TasksContainer from "../TasksContainer";
import { usePathname } from "next/navigation";

const Important = ({ taskList }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const pathName = usePathname();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <TasksContainer
        title={"All Tasks"}
        taskList={taskList}
        loading={loading}
      />
    </>
  );
};

export default Important;
