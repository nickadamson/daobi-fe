import { DAOBI_CONTRACT } from "@/ethereum/abis";
import useRoles from "@/hooks/useRoles";
import { toTrimmedAddress } from "@/utils/index";
import { JsonFragment, JsonFragmentType } from "@ethersproject/abi";
import { useAccount } from "wagmi";
import Function from "./Function";

const chancellorOnlyMethods = ["claimChancellorSalary", "recoverSeal", "mint"];

const Contract = ({ name, address, ABI, visibleMethods }: DAOBI_CONTRACT) => {
  const { address: userAddress, isConnected, connector } = useAccount();
  const { isChancellor } = useRoles(userAddress);

  // get functions from abi
  const allContractFunctions = ABI.filter(
    (method) => method.type === "function" && method?.name
  );

  const callableContractFunctions = allContractFunctions.filter((method) => {
    // filter out important functions
    if (visibleMethods.includes(method.name)) {
      // if function requires being Chancellor...
      if (chancellorOnlyMethods.includes(method.name)) {
        // only show to Chancellor
        if (isChancellor) return method;
      } else return method;
    }
  });

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
      <div className="grid grid-cols-2 gap-2 mx-4 xl:grid-cols-3">
        {isConnected &&
          connector &&
          callableContractFunctions.map((func, idx) => {
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
