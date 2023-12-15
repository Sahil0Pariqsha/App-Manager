"use server";
import user from "@/models/user";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

/*------- Input Validations -------*/
/*------- Global Scoped for using the same fun in Login Action as well -------*/
var emailIsValid = (email: FormDataEntryValue | null) => {
  const tempEmail = email?.toString().trim();
  const regexEmail =
    /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

  if (tempEmail !== undefined) return regexEmail.test(tempEmail);
};
var fullNameIsValid = (name: FormDataEntryValue | null) => {
  const tempName = name?.toString();
  const regexName = /[0-9@#$%^&*()\-_]+/;
  const regexSpaces = /^\s+$/;

  if (tempName !== undefined)
    return !regexName.test(tempName) && !regexSpaces.test(tempName);
};

var hashPassword = async (password: FormDataEntryValue | null) => {
  const tempPassword = password?.toString();

  let hashedPassword;
  if (tempPassword) {
    hashedPassword = await bcrypt.hash(tempPassword, 10);
  }

  return hashedPassword;
};
/*------- Input Validations End -------*/

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

  /*------- Add User to DB -------*/
  const filterName = (name: any) => {
    name = name.replace(/(^\s*)|(\s*$)/gi, "");
    name = name.replace(/[ ]{2,}/gi, " ");
    name = name.replace(/\n /, "\n");
    return name;
  };

  const hashedPassword = await hashPassword(Password);

  const userData = {
    name: filterName(Name?.toString()),
    email: Email?.toString().toLowerCase(),
    password: hashedPassword,
  };

  // await db.collection("users").insertOne({ ...userData });
  await user.create(userData);
  /*------- Add User to DB End-------*/

  console.log("Signup Successful", formData);
  console.log("Validation Successful");

  const userObj = await user.findOne({ email: Email });

  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("userId", userObj._id, { expires: Date.now() + oneDay });

  redirect("/");
  return {};
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

  const userId = userExist?._id.toString();

  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("userId", userId, { expires: Date.now() + oneDay });

  console.log("Login Successful");
  redirect("/");
  // return { ...prevState, userId: userId };
  // console.log({ ...prevState, userId: userId });
};
