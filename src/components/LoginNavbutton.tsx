import { GlobalContext } from "@/context/globalContext";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { ProfileIcon } from "../../public/assets/icons";

export default function LoginNavButton() {
  const { AuthModalOpen } = useContext(GlobalContext);
  const [AuthModalOpenState, setAuthModalOpenState] = AuthModalOpen!;

  const { data: session } = useSession();
  console.log("session data ->", session);
  if (session) {
    return (
      <div className="w-full flex flex-row gap-2 justify-end items-center">
        <button
          onClick={() => {}}
          className="bg-neutral-100 shadow-lg text-black rounded-xl py-3 px-4  active:scale-95 flex items-center gap-2"
        >
          <ProfileIcon />
          <p className="font-medium">{session.user?.name}</p>
        </button>
        <button
          onClick={() => {
            signOut();
          }}
          className="bg-neutral-800 text-white rounded-xl py-3 px-4 shadow-lg shadow-neutral-400 active:scale-95"
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-row justify-end items-center">
      <button
        onClick={() => {
          setAuthModalOpenState(true);
        }}
        className="bg-neutral-800 text-white rounded-3xl py-3 px-4 shadow-lg shadow-neutral-400 active:scale-95"
      >
        Login or Signup
      </button>
    </div>
  );
}
