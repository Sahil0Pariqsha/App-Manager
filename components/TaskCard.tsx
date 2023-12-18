import React from "react";

const TaskCard = ({ title, description, status, important, date }: any) => {
  console.log("status ------ ", status);

  const handleTaskDelete = () => {};
  return (
    <div className="w-[288px] bg-[#323232] border-[#404040] border-2 rounded-2xl px-3 py-4 flex flex-col gap-1 hover:bg-[#1a1a1a] transition-all ease-in-out duration-200">
      <div className="text-[22px] font-bold overflow-hidden text-ellipsis whitespace-nowrap border-b-2 border-[#404040]">
        {title}
      </div>
      <div className="text-[14px] h-[150px] flex-1 my-2 line-clamp-2">
        {description}
      </div>
      <div className="text-[16px] bg-gray-500 w-fit px-3 py-1 rounded-full cursor-pointer hover:bg-gray-600 transition-all ease-in-out duration-200">
        01/01/2024
      </div>
      <div className="flex justify-between items-center">
        <div
          className={`font-bold ${
            status
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } w-fit px-3 py-1 rounded-full cursor-pointer  transition-all ease-in-out duration-200`}
        >
          {status ? "Completed" : "Pending"}
        </div>
        <div className="flex gap-3 text-[#babaca]">
          <button className="hover:text-yellow-500 active:text-yellow-800 transition-all ease-in-out duration-200">
            <i className="fa-solid fa-note-sticky"></i>
          </button>
          <button
            className="hover:text-red-500 active:text-red-800 transition-all ease-in-out duration-200 "
            onClick={handleTaskDelete}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
