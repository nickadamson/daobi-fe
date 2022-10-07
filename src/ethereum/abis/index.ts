import Contract3 from "./DAObiContract3.json";
import ChancellorsSeal from "./DaobiChancellorsSeal.json";
import VoteContract from "./DaobiVoteContract.json";

import { JsonFragment } from "@ethersproject/abi";
import { env } from "process";

export const DAOBI_CONTRACTS: Array<{
  name: string;
  address: string;
  ABI: JsonFragment[];
}> = [
  {
    name: "Contract3",
    address: "0xC808B77Ade52704B8451328CccA8D6652f604b8c",
    // address: env.ERC20_ADDR,
    ABI: Contract3,
  },
  {
    name: "ChancellorsSeal",
    address: "0x20CE6a3b589f44A85695733B11c93C39CfaD6473",
    // address: env.ERC721_ADDR,
    ABI: ChancellorsSeal,
  },
  {
    name: "VoteContract",
    address: "0xdbd584686ad45F57B1E05751269Af93A79429587",
    // address: env.VOTE_ADDR,
    ABI: VoteContract,
  },
];
