"use client";
import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskCard from "./TaskCard";
import { usePathname } from "next/navigation";

const TasksContainer = ({ title, taskList }: any) => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const pathName = usePathname();

  return (
    <div className="flex flex-col px-8 relative gap-6 h-full">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between text-[26px] font-bold">
          <h1 className="whitespace-nowrap">{title}</h1>
          <div className="w-[50%] h-[4px] bg-green-400 rounded-[16px] mb-2"></div>
        </div>
        <div>
          <button
            className="h-[50px] w-[50px] rounded-full border-2 border-[#323232]  text-[#5c5c5c] hover:text-[#b3b3b3] hover:border-[#9a9a9a]"
            onClick={() => setShowTaskModal((prev) => !prev)}
          >
            <i className="fa-solid fa-plus text-[28px] "></i>
          </button>
        </div>
        {showTaskModal && (
          <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
            <AddTaskModal setShowTaskModal={setShowTaskModal} />
          </div>
        )}
      </div>
      <div className="h-full overflow-y-scroll custom-scrollbar">
        <div className="w-full grid grid-cols-4 gap-4 2xl:grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {taskList &&
            taskList.map((curElm: any, index: any) => {
              return (
                <TaskCard
                  key={index}
                  id={curElm._id}
                  title={curElm.taskTitle}
                  description={curElm.taskDescription}
                  status={curElm.taskStatus}
                  important={curElm.taskImportant}
                  date={curElm.updatedAt}
                />
              );
            })}
          {pathName === "/dashboard" && (
            <div className="overflow-hidden rounded-2xl max-md:hidden">
              <div className="flex items-center justify-center h-full bg-[#323232] hover:bg-[#1a1a1a] border-dashed border-[#404040] border-2 rounded-2xl px-3 py-4 gap-1 transition-all ease-in-out duration-200 overflow-scroll custom-scrollbar">
                <button
                  className="flex items-center gap-4 px-3 py-4 text-[#919191] hover:text-white transition-all ease-in-out duration-200"
                  onClick={() => setShowTaskModal((prev) => !prev)}
                >
                  <i className="fa-solid fa-plus text-[28px] "></i>Add New Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksContainer;
