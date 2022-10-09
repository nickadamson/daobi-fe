/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import useRoles from "@/hooks/useRoles";
import { toTrimmedAddress } from "@/utils/index";

// TODO: configure Mainnet for ENS fetching https://wagmi.sh/docs/providers/configuring-chains#multiple-providers
// const { data: ensName } = useEnsName({ address });
// const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });

const Wallet = (): JSX.Element => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const [showDialog, setShowDialog] = useState(false);

  const { isVerified, isChancellor, rolesLoading, rolesErrors } =
    useRoles(address);

  // close dialog/modal with escape
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setShowDialog(false);
    }
  };

  return (
    <>
      {isConnected ? (
        <div>
          {/* <img src={ensAvatar} aria-hidden={true} /> */}
          <div>{/* ensName ? `${ensName}` : */ toTrimmedAddress(address)}</div>

          {/* TODO: TWITTER VERIFICATION 
            after twitter is verified, call API (api/mint/[userAddress]/[twitterUsername]),
            this will use private key and add user to VoterRegistry
          */}

          <div>
            {!isVerified && !rolesLoading && `Verify Twitter ❎`}
            {isVerified &&
              `${isChancellor ? "👑 Welcome Chancellor! 🏰" : "🌾 One Day... 🛖"}
          `}
          </div>
          <button onClick={() => disconnect?.()}>Disconnect</button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setShowDialog(true)}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            Connect Wallet
          </button>
          {error && <div>{error?.message ?? "Failed to connect"}</div>}
        </>
      )}
      {showDialog && !address && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 z-50 w-screen h-screen bg-transparent"
          onClick={() => setShowDialog(false)}
        >
          <dialog
            className="grid relative grid-cols-2 grid-rows-2 gap-2 p-6 mt-16 mr-12 ml-auto w-80 h-44 bg-white border shadow-lg"
            open={showDialog}
          >
            {connectors.map((connector) => {
              return (
                <button
                  className="p-2 text-xs border"
                  // disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => {
                    setShowDialog(false);
                    connect({ connector });
                  }}
                >
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                  {isLoading &&
                    connector.id === pendingConnector?.id &&
                    " (connecting)"}
                </button>
              );
            })}
          </dialog>
        </div>
      )}
    </>
  );
};

export default Wallet;
