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

export interface Props {
  address: null | string;
  balance: null | number;
  isConnected: boolean;
  connectHandler: () => void;
}
