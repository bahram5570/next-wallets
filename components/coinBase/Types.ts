declare global {
  interface Window {
    ethereum: any;
  }
}

export type AccountType = {
  address: null | string;
  balance: null | number;
  isConnected: boolean;
};

export interface ElementsProps {
  address: null | string;
  balance: null | number;
  isConnected: boolean;
  connectHandler: () => void;
}

export interface TransActionsProps {
  address: null | string;
  balance: null | number;
  isConnected: boolean;
  connectHandler: () => void;
  provider: any;
}
