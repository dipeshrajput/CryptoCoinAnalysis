import NextImage from "next/image";
import { StarIcon } from "../../public/assets/icons";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";

interface CoinTableRowProps {
  id: string;
  rank: string;
  coinName: string;
  coinImageUrl: string;
  price: string;
  hour24Change: string;
  totalVolume: string;
  marketCap: string;
}

const CoinTableRow = ({
  id,
  rank,
  coinName,
  coinImageUrl,
  price,
  hour24Change,
  totalVolume,
  marketCap,
}: CoinTableRowProps) => {
  const { coinModalState, coinDetailIdState } = useContext(GlobalContext);
  const [, setCoinModalVisible] = coinModalState!;
  const [, setCoinDetailId] = coinDetailIdState!;

  return (
    <tr
      onClick={() => {
        setCoinDetailId(id);
        setCoinModalVisible(true);
      }}
      className="rounded-xl hover:bg-neutral-100 active:scale-90 transition ease-in duration-100"
    >
      <td className="py-4 rounded-tl-xl rounded-bl-xl">
        <div className="w-full flex flex-row justify-center items-center gap-2 ">
          <StarIcon className="h-5 w-5 active:scale-95" />
          <p>{rank}</p>
        </div>
      </td>
      <td className="py-4 ">
        <div className="w-full px-4 flex flex-row items-center gap-2 ">
          <NextImage
            src={coinImageUrl}
            alt={`coin_image_${rank}`}
            className="h-8 w-8"
            height={0}
            width={0}
          />
          <p>{coinName}</p>
        </div>
      </td>
      <td className="py-4 ">
        <div className="w-full flex justify-left px-8 ">
          <p className="font-medium">${parseFloat(price).toFixed(2)}</p>
        </div>
      </td>
      <td className="py-4">
        <div className="flex justify-center">
          {parseFloat(hour24Change) >= 0 ? (
            <p className="font-medium text-green-500">{hour24Change}</p>
          ) : (
            <p className="font-medium text-red-500">{hour24Change}</p>
          )}
        </div>
      </td>
      <td className="py-4 ">
        <div className="flex justify-center">
          <p className="font-medium">${totalVolume}</p>
        </div>
      </td>
      <td className="py-4 rounded-tr-xl rounded-br-xl">
        <div className="flex justify-center">
          <p className="font-medium">${marketCap}</p>
        </div>
      </td>
    </tr>
  );
};

export default CoinTableRow;
