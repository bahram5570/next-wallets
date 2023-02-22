import { TransActionsProps } from "./Types";

const TransActions = (props: TransActionsProps) => {

  const sendHandler = async () => {

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const requiredId = "0x5";
    
    
    // # Check if the network are equal
    if (chainId !== requiredId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: requiredId }],
        });
      } catch (error) {
        alert("Please change your network!");
      }
    }
    
    // # Send transaction
    else {
      try {
        const params = {
          from: window.ethereum.selectedAddress,
          to: "0x9a1eacd0dbe88b9c368c9082f47c722aeeb40000",
          gas: "0x5208",
          value: (0.001 * Math.pow(10, 18)).toString(16),
        };

        const request = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [params],
        });
      } catch (error) {
        alert("Something sent wrong!");
      }
    }
  };



  return (
    <>
      {props.isConnected && (
        <div className="">
          <button
            onClick={sendHandler}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default TransActions;
