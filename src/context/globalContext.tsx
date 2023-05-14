import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface GlobalContextType {
  coinModalState: [boolean, Function] | null;
  coinDetailIdState: [string, Function] | null;
  AuthModalOpen: [boolean, Function] | null;
}

export const GlobalContext = createContext<GlobalContextType>({
  coinModalState: null,
  coinDetailIdState: null,
  AuthModalOpen: null,
});

export default function GlobalStore({ children }: Props) {
  const [coinDetailsModalVisible, setCoinDetailsModal] = useState(false);
  const [coinDetailId, setCoinDetailId] = useState("bitcoin");
  const [AuthModalOpenState, setAuthModalOpenState] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        AuthModalOpen: [AuthModalOpenState, setAuthModalOpenState],
        coinModalState: [coinDetailsModalVisible, setCoinDetailsModal],
        coinDetailIdState: [coinDetailId, setCoinDetailId],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
