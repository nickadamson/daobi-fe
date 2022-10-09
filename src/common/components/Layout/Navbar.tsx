import { useContractRead } from "wagmi";
import Wallet from "./Wallet";
import Contract3ABI from "../../../ethereum/abis/DAObiContract3.json";
import { toTrimmedAddress } from "@/utils/index";

const Navbar = () => {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0xC808B77Ade52704B8451328CccA8D6652f604b8c", //env.ERC20_ADDR
    contractInterface: Contract3ABI,
    functionName: "chancellor",
  });

  return (
    <div className="flex justify-between place-items-center px-4 w-full max-w-full h-24 border-b">
      <p className="pl-4 w-1/3 text-left">DAObi</p>
      <p className="w-1/3 text-center">
        {!isLoading && !isError && (
          <>
            The current Chancellor is:
            <br />
            <a href={`https://mumbai.polygonscan.com/address/${data}`}>
              {toTrimmedAddress(data as unknown as string)}
            </a>
          </>
        )}
      </p>
      <div className="pr-4 mr-0 w-1/3 text-right">
        <Wallet />
      </div>
    </div>
  );
};

export default Navbar;
