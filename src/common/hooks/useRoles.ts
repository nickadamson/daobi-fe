import { useContractRead } from "wagmi";
import Contract3ABI from "../../ethereum/abis/DAObiContract3.json";
import VoteABI from "../../ethereum/abis/DaobiVoteContract.json";

const useRoles = (userAddress: string) => {
  // get address' Voter Struct from Voter Registry Mapping
  const {
    data: voterStruct,
    isError: isVerifiedError,
    isLoading: isVerifiedLoading,
  } = useContractRead({
    addressOrName: "0xdbd584686ad45F57B1E05751269Af93A79429587", //env.VOTE_ADDR
    contractInterface: VoteABI,
    functionName: "voterRegistry",
    args: [userAddress],
  });

  const {
    data: chancellorAddress,
    isError: isChancellorError,
    isLoading: isChancellorLoading,
  } = useContractRead({
    addressOrName: "0xC808B77Ade52704B8451328CccA8D6652f604b8c", //env.ERC20_ADDR
    contractInterface: Contract3ABI,
    functionName: "chancellor",
  });

  return {
    // check if user verified on twitter
    isVerified: voterStruct?.["serving"],
    // check if user is Chancellor
    isChancellor: (chancellorAddress as unknown as string) === userAddress,
    rolesLoading: isChancellorLoading || isVerifiedLoading,
    rolesErrors:
      isChancellorError || isVerifiedError
        ? [isChancellorError, isVerifiedError]
        : null,
  };
};

export default useRoles;
