import userTasks from "@/models/userTasks";
import { extractTokenPayload } from "@/utils/functions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET() {
  // try {
  //   const auth = cookies().get("userToken") || ("" as any);
  //   console.log("api/taskslist")
  //   if (!auth) {
  //     console.log("unauthorized", auth);
  //     return new Response("Unauthorized", {
  //       status: 401,
  //     });
  //   }

  //   const userId = await extractTokenPayload(auth);

  //   const taskList = await userTasks.find({ user_id: userId });

  //   console.log("taskslist",userId, taskList);

  //   if (!taskList) {
  //     return new Response("Tasks with this user id not found", {
  //       status: 401,
  //     });
  //   }
  //   return new Response(JSON.stringify(taskList), {
  //     status: 200,
  //   });
  // } catch (error) {
  //   return new Response("Unauthorized", {
  //     status: 401,
  //   });
  // }

  console.log("api/taskslist");

  // return new Response(
  //   JSON.stringify({
  //     msg: "success",
  //   }),
  //   { status: 200 }
  // );
  return Response.json({ msg: "success" });
}

// export async function DELETE(req: Request | NextRequest) {
//   try {
//     const urlParams = new URL(req.url!);
//     const taskId = urlParams.searchParams.get("id");

//     if (!taskId) {
//       return new Response(JSON.stringify({ message: "Task ID is required" }), {
//         status: 400,
//       });
//     }

//     const task = await userTasks.findOne({ _id: taskId });
//     if (!task) {
//       return new Response(JSON.stringify({ message: "Task not found" }), {
//         status: 404,
//       });
//     }

//     const deletedTask = await userTasks.deleteOne({ _id: taskId });

//     if (deletedTask) {
//       return new Response(
//         JSON.stringify({ message: "Task deleted successfully" }),
//         {
//           status: 200,
//         }
//       );
//     } else {
//       return new Response(
//         JSON.stringify({ message: "Unexpected error. Please try again." }),
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const dynamic = "force-dynamic";
