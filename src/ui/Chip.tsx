import tw from "@/utils/tw";
import * as React from "react";

interface Props {
  children: React.ReactElement;
  className?: string;
}
const Chip = ({ children, className }: Props) => {
  return (
    <div
      className={tw(
        "bg-neutral-100 rounded-lg py-1 px-3.5 text-center cursor-pointer active:scale-95",
        className && className
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
