import Contract3 from "./DAObiContract3.json";
import ChancellorsSeal from "./DaobiChancellorsSeal.json";
import VoteContract from "./DaobiVoteContract.json";

import { JsonFragment } from "@ethersproject/abi";
import { env } from "process";

export interface DAOBI_CONTRACT {
  name: string;
  address: string;
  ABI: JsonFragment[];
  visibleMethods: string[];
}

export const DAOBI_CONTRACTS: DAOBI_CONTRACT[] = [
  {
    name: "Contract3",
    address: "0xC808B77Ade52704B8451328CccA8D6652f604b8c", // env.ERC20_ADDR,
    ABI: Contract3,
    visibleMethods: [
      "chancellorSalary",
      "claimChancellorSalary",
      "salaryInterval",
      "lastSalaryClaim",
      "makeClaim",
      "recoverSeal",
      "chancellor",
      "mint",
    ],
  },
  {
    name: "ChancellorsSeal",
    address: "0x20CE6a3b589f44A85695733B11c93C39CfaD6473", // env.ERC721_ADDR,
    ABI: ChancellorsSeal,
    visibleMethods: [
      "symbol",
      "totalSupply",
      "tokenURI",
      "DAOBI_CONTRACT",
      "DEFAULT_ADMIN_ROLE",
      "PAUSER_ROLE",
      "SEAL_MANAGER",
      "UPGRADER_ROLE",
      // 'renounceRole'?
    ],
  },
  {
    name: "VoteContract",
    address: "0xdbd584686ad45F57B1E05751269Af93A79429587", // env.VOTE_ADDR,
    ABI: VoteContract,
    visibleMethods: [
      "register",
      "vote",
      "seeBallot",
      "checkStatus",
      "assessVotes",
      "getAlias",
      "recluse",
      "selfImmolate",
    ],
  },
];
