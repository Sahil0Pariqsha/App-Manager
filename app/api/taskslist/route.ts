import userTasks from "@/models/userTasks";
import { extractTokenPayload } from "@/utils/functions";

export const GET = async (request: any) => {
  try {
    const auth = request.cookies.get("userToken") || "";
    if (!auth) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const userId = await extractTokenPayload(auth);

    const taskList = await userTasks.find({ user_id: userId });
    // console.log(userId, taskList);

    if (!taskList) {
      return new Response("Tasks with this user id not found", {
        status: 401,
      });
    }

    return new Response(JSON.stringify(taskList), {
      status: 200,
    });
  } catch (error) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
};
