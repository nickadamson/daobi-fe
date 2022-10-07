import { toTrimmedAddress } from "@/utils/index";
import { JsonFragment, JsonFragmentType } from "@ethersproject/abi";
import { useAccount } from "wagmi";
import Function from "./Function";

interface Props {
  name: string;
  address: string;
  ABI: JsonFragment[];
}

const Contract = ({ name, address, ABI }: Props) => {
  // get functions from abi
  const contractFunctions = ABI.filter(
    (method) => method.type === "function" && method?.name
  );

  const { isConnected, connector } = useAccount();

  return (
    <div className="w-full h-full">
      <div className="mx-auto my-2 text-center">
        {`Contract Methods for ${name}`}
        <br />
        <a
          className="text-sm underline hover:cursor-pointer"
          href={`https://mumbai.polygonscan.com/address/${address}`}
        >
          <p>View {toTrimmedAddress(address)} on BlockExplorer</p>
        </a>
        <br />
      </div>
      {/* show each function if acct is connected  */}
      <div className="grid grid-cols-2 gap-2 mx-auto xl:grid-cols-3">
        {isConnected &&
          connector &&
          contractFunctions.map((func, idx) => {
            return (
              <Function
                key={`${func?.name}-${address}-${idx}`}
                name={func?.name}
                stateMutability={func?.stateMutability}
                inputs={func.inputs}
                outputs={func.outputs}
                contractABI={ABI}
                contractAddress={address}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Contract;
