import { InfoFilledIcon, InfoIcon } from "../../../public/assets/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/Tooltip";

interface Props {
  statHeader: string;
  statValue: string;
  statDescription?: string;
  statValue2?: React.ReactElement | string;
}

const MarketStatCard = ({ statHeader, statValue, statValue2 }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="flex flex-col gap-0 items-start ">
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-neutral-700 font-light">{statHeader}</p>
            <TooltipTrigger>
              <InfoFilledIcon className="h-3.5 w-3.5 text-neutral-300 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="bg-white w-52 rounded-lg">
              {statValue2 && (
                <p className="text-neutral-900 font-base text-xs">
                  {statValue2}
                </p>
              )}
            </TooltipContent>
          </div>
          <p className="font-semibold text-neutral-700">{statValue}</p>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MarketStatCard;
