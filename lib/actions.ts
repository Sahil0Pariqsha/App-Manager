"use server";
import user from "@/models/user";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import dbConnect from "./dbconnect";
import {
  emailIsValid,
  extractTokenPayload,
  fullNameIsValid,
  generateToken,
  hashPassword,
} from "@/utils/functions";
import userTasks from "@/models/userTasks";

dbConnect();

/*------- Sign Up user Action -------*/
export const handleSignUpAction = async (
  prevState: any,
  formData: FormData
): Promise<FormDataErrors> => {
  const rawFromData = {
    Name: formData.get("name"),
    Email: formData.get("email"),
    Password: formData.get("password"),
    Confirm_Password: formData.get("confirm-password"),
  };

  const { Name, Email, Password, Confirm_Password } = rawFromData;
  const errors: Partial<FormDataErrors> = {};

  /*------- User Input Validation -------*/
  if (!fullNameIsValid(Name)) {
    errors.name =
      "* Name should not be empty or contain special characters only";
  }

  if (!emailIsValid(Email)) {
    errors.email = "* Please enter a valid email address eg. test123@gmail.com";
  }

  if (Password !== Confirm_Password) {
    errors.confirm_password =
      "* Passwords do not match. Please re-enter them correctly";
  }

  const userExist = await user.findOne({ email: Email });
  if (userExist) {
    errors.email = "* User with this email already exist";
  }

  /*------- if any error is there return it -------*/
  if (Object.keys(errors).length > 0) {
    return { ...prevState, ...errors };
  }

  const hashedPassword = await hashPassword(Password);

  const userData = {
    name: Name?.toString()
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (char: any) => char.toUpperCase()),
    email: Email?.toString().toLowerCase(),
    password: hashedPassword,
  };

  await user.create(userData);

  console.log("Signup Successful", formData);
  console.log("Validation Successful");

  const userObj = await user.findOne({ email: Email });
  const userToken = generateToken(userObj._id);

  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("userToken", userToken, { expires: Date.now() + oneDay });

  redirect("/dashboard");
  // return {};
};

/*------- Log In user Action -------*/
export const handleLogInAction = async (
  prevState: any,
  formData: FormData
): Promise<FormDataErrors> => {
  const errors: Partial<FormDataErrors> = {};

  const rawFromData = {
    Email: formData.get("email"),
    Password: formData.get("password"),
  };

  const { Email, Password } = rawFromData;
  if (!emailIsValid(Email)) {
    errors.email = "* Please enter a valid email address eg. test123@gmail.com";
  }

  if (Object.keys(errors).length > 0) {
    return { ...prevState, ...errors };
  }
  try {
    var userExist = await user.findOne({ email: Email }); // declared var to access with in the block
    console.log("Existing user object :", userExist);

    if (!userExist) {
      errors.email = null;
      errors.userExist = "* User with this email doesn't exist";
    } else {
      const storedPassword = userExist.password;

      const matchPassword = await bcrypt.compare(
        Password as string,
        storedPassword
      );

      if (!matchPassword) {
        errors.userExist = null;
        errors.wrongPassword = "* Password for this email is incorrect";
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (Object.keys(errors).length > 0) {
    return { ...prevState, ...errors };
  }

  const userId = userExist._id;
  const userToken = generateToken(userId);

  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("userToken", userToken, { expires: Date.now() + oneDay });

  console.log("Login Successful");
  redirect("/dashboard");
  // return { ...prevState, userId: userId };
  // console.log({ ...prevState, userId: userId });
};

/*------- Add User Tasks Action -------*/
export const handleAddTaskAction = async (
  prevState: any,
  formData: FormData
): Promise<AddTaskFromErrors> => {
  const errors: Partial<AddTaskFromErrors> = {};

  let rawFromData = {
    title: formData.get("task_title"),
    description: formData.get("task_description"),
    status: formData.get("task_status"),
    important: formData.get("check_important"),
  };

  let { title, description, status, important }: any = rawFromData;
  function capitalizeFirstLetter(string: any) {
    let words = string.trim().split(/\s+/);

    for (let i = 0; i < words.length; i++) {
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }

    return words.join(" ");
  }

  title = capitalizeFirstLetter(rawFromData.title);
  description = capitalizeFirstLetter(rawFromData.description);

  if (title.length === 0) {
    errors.title = "* Title should not be empty";
  } else if (title.length > 100) {
    errors.title = "* Title should not exceed 100 characters";
  }

  if (description.length === 0) {
    errors.description = "* Description should not be empty";
  } else if (description.length > 500) {
    errors.description = "* Description should not exceed 500 characters";
  }

  const tokenValue = cookies().get("userToken");
  const { value }: any = tokenValue;

  const userId = await extractTokenPayload(value);
  console.log(userId);

  if (Object.keys(errors).length > 0) {
    return { ...prevState, ...errors };
  }

  const taskData = {
    user_id: userId,
    taskTitle: title,
    taskDescription: description,
    taskStatus: status === "Completed",
    taskImportant: important ? true : false,
  };

  userTasks.create(taskData);

  console.log(rawFromData, title, description);
  return {};
};
