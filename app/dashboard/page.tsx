// import React, { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import { extractTokenPayload } from "@/utils/functions";
import { cookies } from "next/headers";
import userTasks from "@/models/userTasks";
import DashboardTemp from "@/components/DashboardTemp";
import axios from "axios";

async function callApi(){
  console.log("calling api")
  try{

    const res = await fetch("http://localhost:3000/api/taskslist");
    // const data = await res.json();
    // console.log("data",data);
  }catch(err){
    console.log("ERROR :",err)
  }

}

export default async function Page() {
  console.log("dashboard page");
  // const [taskList, setTaskList] = useState<any>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  callApi()
  // const data = await res.json();
    console.log("dashboard page 2");
  // Axios ---
  /*---------------------------------------------------------------------------------------*/
  // const fetchTaskList = async (): Promise<any> => {
  //   const response = await axios.get("/api/taskslist");
  //   const data = await response.data;
  // };
  // const data = await Promise.resolve(fetchTaskList);
  // console.log("Dashboard Page", await fetchTaskList, data);
  /*---------------------------------------------------------------------------------------*/

  // Fetch ---
  /*---------------------------------------------------------------------------------------*/
  // const fetchTaskList = async ()=> {
  //   const res = await fetch("http://localhost:3000/api/taskslist");
  //   // console.log("res", res);
  //   // const data = await res.json();
  //   // console.log("data",data);
  //   // return data;
  // };

  // const data = await fetchTaskList();
  // console.log("Dashboard Page", await fetchTaskList(), data);
  /*---------------------------------------------------------------------------------------*/

  // Direct ---
  /*---------------------------------------------------------------------------------------*/
  // const auth = cookies().get("userToken") || ("" as any);
  // const userId: any = await extractTokenPayload(auth);
  // const taskList = await userTasks.find({ user_id: userId });
  // console.log("taskList ==>", taskList);
  /*---------------------------------------------------------------------------------------*/

  return (
    <div className="flex-1 bg-[#212121] border-2 border-[#323232] rounded-2xl">
      <DashboardTemp taskList={[]} />
      {/* <Dashboard taskList={taskList} /> */}
    </div>
  );
}
