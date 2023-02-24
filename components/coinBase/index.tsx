import { useCallback, useEffect, useState } from "react";
import Elements from "./Elements";
import TransActions from "./TransActions";
import { AccountType } from "./Types";

const CoinBase = () => {

  const [currentAccount, setCurrentAccount] = useState<AccountType>({
    address: null,
    balance: null,
    isConnected: false,
  });




  // # Tracking the extension installation and CoinBase wallet
  const [hasExtension, setHasExtension] = useState(false);
  const [provider, setProvider] = useState<any>(null)
  
  useEffect(() => {
    // # Check if there's any other wallets
    if (window.ethereum.providers) {
      setProvider(window.ethereum.providers[0])
      setHasExtension(true);
    }
    
    // # Or just check the current wallet
    else if (window.ethereum.isCoinbaseWallet) {
      setProvider(window.ethereum)
      setHasExtension(true);
      
    }
  }, []);
  





  // # Main connecting function
  const connectHandler = useCallback(async () => {
        
    if (hasExtension) {
      try {
        // # Get the open the extension and address wallet
        const request = await provider.request({
          method: "eth_requestAccounts",
        });

        await accountHandler(request[0]);
      } catch (error: any) {
        if (
          error.message.includes(
            "Request of type 'wallet_requestPermissions' already pending for origin"
          )
        ) {
          alert("CoinBase extension is open!");
        }
      }
    } else {
      window.open("https://www.coinbase.com/wallet/downloads", "_blank");
    }
  }, [hasExtension]);

  // # Get the balance account and set the state
  const accountHandler = async (address: string) => {
    const request = await provider.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });

    const dec = parseInt(request, 16);
    const balance = dec / 10 ** 18;

    setCurrentAccount({
      address,
      balance,
      isConnected: true,
    });

    localStorage.setItem("coinBaseIsConnected", "true");
  };




  // # Inspecting the changes
  useEffect(() => {
    if (hasExtension) {
      const accountsChanged = (status: string[]) => {
        if (status.length === 0) {
          setCurrentAccount({
            address: null,
            balance: null,
            isConnected: false,
          });
          localStorage.removeItem("coinBaseIsConnected");
        } else {

          // # Set the data after connecting and changing the account
          connectHandler();
        }
      };

      // # Remove all states and localStorage in case of logging out
      provider.on("accountsChanged", accountsChanged);

      // # Change states after changing the accounts
      provider.on("chainChanged", connectHandler);

      return () => {
        provider.removeListener("accountsChanged", accountsChanged);
        provider.removeListener("chainChanged", connectHandler);
      };
    }
  }, [connectHandler, hasExtension]);




  // # Connect after refresh
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("coinBaseIsConnected");

    if (hasExtension && isLoggedIn) {
      connectHandler();
    }
  }, [hasExtension, connectHandler]);

  

  return (
    <section>
      <h1 className="text-6xl font-bold text-center mb-10">CoinBase</h1>

      <Elements
        connectHandler={connectHandler}
        address={currentAccount.address}
        balance={currentAccount.balance}
        isConnected={currentAccount.isConnected}
        />

      <TransActions
        connectHandler={connectHandler}
        address={currentAccount.address}
        balance={currentAccount.balance}
        isConnected={currentAccount.isConnected}
        provider={provider}
       />
    </section>
  );
};

export default CoinBase;
