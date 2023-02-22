import { Props } from "./Types";

const Elements = (props: Props) => {
  return (
    <>
      {!props.isConnected && (
        <button
          onClick={props.connectHandler}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Connect
        </button>
      )}

      {props.isConnected && (
        <div className="flex flex-col text-3xl gap-4">
          <span>Address: {props.address}</span>
          <span>Balance: {props.balance}</span>
        </div>
      )}
    </>
  );
};

export default Elements;
