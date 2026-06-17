import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import NewEmailPopUp from "../../components/user-dashboard/NewEmailPopUp";
import ResetEmailPopUp, {
  VerifyEmailPopUp,
} from "../../components/user-dashboard/PopUpWindow";
import Verifylabel from "../../components/Verifylabel";
import useUpdateData from "../../hooks/useUpdateData";
import editicon_white from "../../img/svg/edit-white.svg";
import type { profiledata, profilepersonalForm } from "../../lib/types";
import { toDateInput } from "../../utils/dateconverUtils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .regex(/^[^\d]+$/, "Full name cannot contain numbers"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-]{8,13}$/, "Invalid phone number")
    .nullable()
    .optional(),
  birthDate: z.string().nullable().optional(),
});

export default function Settings() {
  const profiledata = (useLoaderData() as { userdata: profiledata }).userdata;
  const [personalForm, setPersonalForm] = useState<profilepersonalForm>({
    id: profiledata.id,
    fullName: profiledata.fullName,
    avatar: profiledata.avatar,
    phone: profiledata.phone,
    birthDate: toDateInput(profiledata.birthDate),
  });
  const [isReset, setIsReset] = useState<boolean>(false);
  const [isVerifyEmail, setisVerifyEmail] = useState<boolean>(false);
  const [isChangeMail, setIsChangeMail] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { handleFileSelect, handleFileUpload, isPending, handleCancelEdit } =
    useUpdateData(personalForm, setPersonalForm, () => {
      setIsEditing(false);
      window.location.reload();
    });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: profiledata.fullName ?? "",
      phone: profiledata.phone ?? "",
      birthDate: toDateInput(profiledata.birthDate) ?? "",
    },
  });

  useEffect(() => {
    const sub = watch((values) => {
      setPersonalForm((prev) => ({
        ...prev,
        fullName: values.fullName ?? prev.fullName,
        phone: values.phone ?? null,
        birthDate: values.birthDate ?? null,
      }));
    });
    return () => sub.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsReset(false);
        setIsChangeMail(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <main className=" relative flex-1 flex px-10 py-10 flex-col min-h-full gap-5 ">
      {/* //------> */}

      {isReset && (
        <ResetEmailPopUp triggerfunction={setIsReset} userdata={profiledata} />
      )}
      {isChangeMail && (
        <NewEmailPopUp
          triggerfunction={setIsChangeMail}
          userdata={profiledata}
        />
      )}
      {isVerifyEmail && (
        <VerifyEmailPopUp
          triggerfunction={setisVerifyEmail}
          userdata={profiledata}
        />
      )}
      {/* //------> */}
      <div>
        <h1 className="text-2xl font-medium text-claundry-blue">Settings</h1>
        <p className="text-sm text-neutral-400">
          Manage your profile details and settings here
        </p>
      </div>
      <div>
        <div className="w-fit">
          <h3 className="text-sm">Personal Data</h3>
          <hr className=" border-neutral-400" />
        </div>
        <hr className="border-neutral-400" />
      </div>
      <div className="flex w-fit  gap-10">
        <div className="w-40 min-w-40 flex flex-col gap-5 items-center ">
          <p className="italic text-neutral-500 text-sm">Profile Picture</p>
          <div className="relative">
            <img
              src={personalForm.avatar}
              referrerPolicy="no-referrer"
              className="h-30 w-30 rounded-full object-cover bg-neutral-400"
            />
            <input
              type="file"
              name=""
              id="uploadpicture"
              className="hidden"
              accept="image/jpeg,image/jpg, image/png, image/gif"
              onChange={(e) => {
                handleFileSelect(e);
                setIsEditing(true);
              }}
            />
            <label
              htmlFor="uploadpicture"
              aria-label="change-avatar-profile-picture"
              className=" flex items-center justify-center outline-4 outline-white absolute bottom-0 right-0  bg-claundry-blue rounded-full w-10 h-10 hover:cursor-pointer hover:bg-black"
            >
              <img src={editicon_white} alt="" className="w-6 object-cover" />
            </label>
          </div>
          <p className="text-sm text-neutral-400 italic text-center">
            Only .jpg, .jpeg, .png dan .gif & Maximum file size is 1MB.
          </p>
        </div>
        <div className="flex w-fit flex-col gap-5 justify-center ">
          <div className="flex flex-col gap-1 w-100">
            <h2>Full Name</h2>
            <input
              type="text"
              {...register("fullName")}
              className={
                isEditing
                  ? `border w-100 border-neutral-400 rounded-lg px-3 py-1`
                  : `pointer-events-none `
              }
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
            {!isEditing && <hr className="border-neutral-200" />}
          </div>
          <div className="flex flex-col gap-1">
            <h2>Phone number</h2>
            <input
              type="text"
              {...register("phone")}
              className={
                isEditing
                  ? `border w-100 border-neutral-400 rounded-lg px-3 py-1`
                  : `pointer-events-none `
              }
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
            {!isEditing && <hr className="border-neutral-200" />}
          </div>
          <div className="flex flex-col gap-1">
            <h2>Birth Date</h2>
            <input
              type={isEditing ? "date" : "text"}
              {...register("birthDate")}
              className={
                isEditing
                  ? `border w-100 border-neutral-400 rounded-lg px-3 py-1`
                  : `pointer-events-none`
              }
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
            )}
            {!isEditing && <hr className="border-neutral-200" />}
          </div>
          <div className="flex items-center gap-5  justify-between">
            <button
              onClick={() => {
                if (isEditing) {
                  handleCancelEdit();
                  reset({
                    fullName: profiledata.fullName ?? "",
                    phone: profiledata.phone ?? "",
                    birthDate: toDateInput(profiledata.birthDate) ?? "",
                  });
                }
                setIsEditing(!isEditing);
              }}
              className={`${isEditing ? "bg-white border border-blue-700 text-blue-700" : "bg-claundry-blue text-white"} mt-5 w-fit px-5 py-2  rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isEditing ? "Cancel Editing" : "Edit Details"}
            </button>
            {isEditing && (
              <button
                onClick={handleSubmit(handleFileUpload)}
                disabled={isPending}
                className="bg-claundry-blue mt-5 w-fit px-5 py-2 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Uploading..." : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="w-fit">
          <h3 className="text-sm">Security Credentials</h3>
          <hr className=" border-neutral-400" />
        </div>
        <hr className="border-neutral-400" />
      </div>
      <div className=" w-full  flex gap-5 items-end">
        <div className="flex flex-col w-full  gap-1">
          <h2 className="text-lg">E-Mail</h2>
          <div className="flex gap-2 ">
            <div className=" border-neutral-400   py-1">
              {profiledata.email || "-"}
            </div>
            <Verifylabel verifydata={profiledata.verifiedAt} />
          </div>
        </div>
        <div className="flex items-center gap-5">
          {profiledata.provider !== "CREDENTIALS" && (
            <small className="text-red-400 whitespace-nowrap">
              Social logins are unable to change email
            </small>
          )}
          {profiledata.verifiedAt ? (
            <button
              onClick={() => setIsChangeMail(true)}
              className={`border w-fit px-5 py-2 border-neutral-400 rounded-lg whitespace-nowrap hover:bg-black hover:text-white ${profiledata.provider === "CREDENTIALS" ? "text-neutral-800 " : "bg-neutral-300 text-neutral-400 pointer-events-none"}`}
            >
              {" "}
              Change Email
            </button>
          ) : (
            <button
              onClick={() => setisVerifyEmail(true)}
              className="border w-fit px-5 py-2 border-neutral-400 rounded-lg text-neutral-800 whitespace-nowrap hover:bg-black hover:text-white"
            >
              {" "}
              Verify E-Mail
            </button>
          )}
        </div>
      </div>
      <hr className="border-neutral-200" />
      <div className="flex justify-between items-end gap-1">
        <h2 className="text-lg">Password</h2>
        <div className="flex gap-5 items-center">
          {profiledata.provider !== "CREDENTIALS" && (
            <small className="text-red-400">
              Social logins are unable to change password
            </small>
          )}

          <button
            onClick={() => setIsReset(true)}
            disabled={isReset ? true : false}
            className={`border w-fit px-5 py-2 border-neutral-400 rounded-lg whitespace-nowrap hover:bg-black hover:text-white ${profiledata.provider === "CREDENTIALS" ? "text-neutral-800 " : "bg-neutral-300 text-neutral-400 pointer-events-none"}`}
          >
            {" "}
            Change Password
          </button>
        </div>
      </div>
      <hr className="border-neutral-200" />
    </main>
  );
}
