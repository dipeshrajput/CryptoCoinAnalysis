import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface GlobalContextType {
  coinModalState: [boolean, Function] | null;
  coinDetailIdState: [string, Function] | null;
}

export const GlobalContext = createContext<GlobalContextType>({
  coinModalState: null,
  coinDetailIdState: null,
});

export default function GlobalStore({ children }: Props) {
  const [coinDetailsModalVisible, setCoinDetailsModal] = useState(false);
  const [coinDetailId, setCoinDetailId] = useState("bitcoin");
  return (
    <GlobalContext.Provider
      value={{
        coinModalState: [coinDetailsModalVisible, setCoinDetailsModal],
        coinDetailIdState: [coinDetailId, setCoinDetailId],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
