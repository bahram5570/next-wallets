import { useCallback, useEffect, useState } from "react";
import Elements from "./Elements";
import { AccountType } from "./Types";

const Phantom = () => {

  const [currentAccount, setCurrentAccount] = useState<AccountType>({
    address: null,
    balance: null,
    isConnected: false,
  });




  // # Tracking the extension installation and Phantom wallet
  const [hasExtension, setHasExtension] = useState(false);
  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {    

    // # Check if the wallet is installed
    if ("phantom" in window) {
      setProvider(window.phantom?.solana)
      setHasExtension(true);
    }
    
  }, []);
  




  // # Main connecting function
  const connectHandler = useCallback(async () => {

    if (hasExtension) {
      try {
        // # Get the open the extension and address wallet
        const request = await provider.connect();

        await accountHandler(request.publicKey.toString());
      } catch (error: any) {
        if (
          error.message.includes(
            "Request of type 'wallet_requestPermissions' already pending for origin"
          )
        ) {
          alert("Phantom extension is open!");
        }
      }
    } else {
      window.open("https://phantom.app/download", "_blank");
    }
  }, [hasExtension]);

  // # Get the balance account and set the state
  const accountHandler = async (address: string) => {

    setCurrentAccount({
      address,
      balance: 0,
      isConnected: true,
    });
    

    localStorage.setItem("phantomIsConnected", "true");
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
          localStorage.removeItem("phantomIsConnected");
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
    const isLoggedIn = localStorage.getItem("phantomIsConnected");

    if (hasExtension && isLoggedIn) {
      connectHandler();
    }
  }, [hasExtension, connectHandler]);




  const disConnectHandler = async () => {    
    await provider.disconnect()
    localStorage.removeItem("phantomIsConnected");
    setCurrentAccount({
      address: null,
      balance: null,
      isConnected: false,
    });
  }

  

  return (
    <section>
      <h1 className="text-6xl font-bold text-center mb-10">Phantom</h1>

      <Elements
        connectHandler={connectHandler}
        disConnectHandler={disConnectHandler}
        address={currentAccount.address}
        balance={currentAccount.balance}
        isConnected={currentAccount.isConnected}
        />
    </section>
  );
};

export default Phantom;
