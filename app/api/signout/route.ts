import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = (request: Request | NextRequest) => {
  try {
    const auth = cookies().get("userToken") || "";
    if (!auth) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const response: any = {
      message: "User logged out successfully",
    };

    cookies().delete("userToken");
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
