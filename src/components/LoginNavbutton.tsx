import { GlobalContext } from "@/context/globalContext";
import { useContext } from "react";

export default function LoginNavButton() {
  const { AuthModalOpen } = useContext(GlobalContext);
  const [AuthModalOpenState, setAuthModalOpenState] = AuthModalOpen!;

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
