import React from "react";

const TasksContainer = () => {
  return (
    <div className="flex justify-between px-6">
      <div className="flex flex-col justify-between text-[26px] font-bold decoration-">
        <h1 className="whitespace-nowrap">All Tasks</h1>
        <div className="w-[50%] h-[4px] bg-green-400 rounded-[16px]"></div>
      </div>
      <div>
        <button className="h-[60px] w-[60px] rounded-[50%] border-2 border-[#323232]  text-[#5c5c5c] hover:text-[#b3b3b3] hover:border-[#9a9a9a]">
          <i className="fa-solid fa-plus text-[28px] "></i>
        </button>
      </div>
    </div>
  );
};

export default TasksContainer;
