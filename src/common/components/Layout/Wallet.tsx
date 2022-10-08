/* eslint-disable @next/next/no-img-element */
import { toTrimmedAddress } from "@/utils/index";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

const Wallet = (): JSX.Element => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { address, connector, isConnected } = useAccount();
  // TODO: configure Mainnet for ENS fetching https://wagmi.sh/docs/providers/configuring-chains#multiple-providers
  // const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });

  if (isConnected) {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/alt-text  */}
        {/* <img src={ensAvatar} aria-hidden={true} /> */}
        <div>{/* ensName ? `${ensName}` : */ toTrimmedAddress(address)}</div>
        <div>Connected to {connector?.name}</div>
        <button onClick={() => disconnect?.()}>Disconnect</button>
      </div>
    );
  } else {
    return (
      <div className="gap-2">
        {connectors.map((connector) => {
          return (
            <button
              className="p-2 text-xs border"
              // disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          );
        })}

        {error && <div>{error?.message ?? "Failed to connect"}</div>}
      </div>
    );
  }
};

export default Wallet;
