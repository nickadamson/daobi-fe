import type { NextPage } from "next";
import { DAOBI_CONTRACTS } from "@/ethereum/abis";
import Contract from "@/components/Contract";
import { useState } from "react";

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full h-full">
      <p className="mx-auto w-1/2 text-center">Select Contract</p>
      <div className="flex justify-around mx-auto my-4 w-1/2">
        {DAOBI_CONTRACTS.map((contract, idx) => {
          return (
            <button
              key={contract.name}
              onClick={() => setActiveTab(idx)}
              className={`p-4 ${activeTab === idx ? "border-2" : "border"}`}
            >
              {contract.name}
            </button>
          );
        })}
      </div>
      {/* for each abi show contract component */}
      {DAOBI_CONTRACTS.map((contract, idx) => {
        return (
          <div
            key={contract.name}
            className={`${activeTab === idx ? "" : "hidden"}`}
          >
            <Contract
              name={contract.name}
              address={contract.address}
              ABI={contract.ABI}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
