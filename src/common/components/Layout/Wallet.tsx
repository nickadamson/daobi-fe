import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";

const Wallet = (): JSX.Element => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { address, connector, isConnected } = useAccount();
  // const { data: ensName } = useEnsName({ address });

  if (isConnected) {
    return (
      <div>
        {/* <img src={accountData.ens?.avatar} alt="ENS Avatar" /> */}
        <div>{/*ensName ? ensName :*/ address}</div>
        {/* <div>Connected to {accountData.connector.name}</div> */}
        <button onClick={() => disconnect}>Disconnect</button>
      </div>
    );
  } else {
    return (
      <div>
        {connectors.map((x) => (
          <button disabled={!x.ready} key={x.id} onClick={() => x.connect()}>
            {x.name}
            {!x.ready && " (unsupported)"}
          </button>
        ))}

        {error && <div>{error?.message ?? "Failed to connect"}</div>}
      </div>
    );
  }
};

export default Wallet;
