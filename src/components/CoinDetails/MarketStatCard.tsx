import { InfoFilledIcon, InfoIcon } from "../../../public/assets/icons";

interface Props {
  statHeader: string;
  statValue: string;
  statDescription?: string;
  statValue2?: string;
}

const MarketStatCard = ({ statHeader, statValue, statValue2 }: Props) => {
  return (
    <div className="flex flex-col gap-0 items-start ">
      <div className="flex flex-row items-center gap-2">
        <p className="text-sm text-neutral-700 font-light">{statHeader}</p>
        <InfoFilledIcon className="h-3.5 w-3.5 text-neutral-300 cursor-pointer" />
      </div>
      <p className="font-semibold text-neutral-700">{statValue}</p>
      {statValue2 && (
        <p className="text-neutral-500 font-light text-sm">{statValue2}</p>
      )}
    </div>
  );
};

export default MarketStatCard;
