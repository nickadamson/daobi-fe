import Input from "./Input";
import { JsonFragment, JsonFragmentType } from "@ethersproject/abi";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useEffect, useState } from "react";
import { BigNumber, BigNumberish } from "ethers";
import { toTrimmedAddress } from "@/utils/index";

interface Props {
  name: string;
  stateMutability: string;
  inputs: readonly JsonFragmentType[];
  outputs: readonly JsonFragmentType[];
  contractABI: JsonFragment[];
  contractAddress: string;
}

const Function = ({
  name,
  stateMutability,
  inputs,
  outputs,
  contractABI,
  contractAddress,
}: Props) => {
  const { address } = useAccount();
  // useState for all input values
  const [formData, setFormData] = useState(
    formatIODefaultValues(inputs, address) // .sol types -> .js types
  );
  const [txWillError, setTxWillError] = useState(true);

  // read
  const {
    data: viewData,
    isSuccess: viewIsSuccess,
    isError: viewIsError,
    isLoading: viewIsLoading,
    refetch: viewRefetch,
  } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    functionName: name,
    args:
      inputs.length > 0
        ? formData.map((input) => {
            if (typeof input.value === "number") {
              input.value = BigNumber.from(input.value.toString());
            }
            return input.value;
          })
        : undefined,
    onSuccess(data) {
      if (name === "CHANCELLOR_ROLE") console.log(typeof data, data);
    },
    onError(data) {
      if (name === "CHANCELLOR_ROLE") console.log(typeof data, data);
    },
  });

  // write
  const { config, refetch } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    functionName: name,
    args: formData.map((input) => {
      if (typeof input.value === "number") {
        input.value = BigNumber.from(input.value.toString());
      }
      return input.value;
    }),
    // enabled: false,
    onSuccess() {
      setTxWillError(false);
    },
    onError() {
      //   console.log("Error", error);
      setTxWillError(true);
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  //   const [skipFetch, setSkipFetch] = useState(true);

  useEffect(() => {
    // if (skipFetch) setSkipFetch(false);
    // else if (!skipFetch) {
    refetch();
    viewRefetch();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const formattedViewData =
    typeof viewData !== "object"
      ? viewData
      : (viewData as BigNumberish)?.toString();

  return (
    <div className="flex flex-col justify-between p-4 m-auto w-full h-full border-2">
      <p className="text-lg font-bold">{`${name} (${stateMutability})`}</p>
      {stateMutability === "view" && (
        <div>
          <br />
          Value{`(${outputs[0].type})`}:{viewIsLoading && <p>spinner</p>}
          {viewIsError && <p>error</p>}
          {viewIsSuccess && (
            <div className="overflow-x-auto max-w-32">
              {/* {formattedViewData.length === 42
                ? toTrimmedAddress(formattedViewData)
                : formattedViewData} */}
              {formattedViewData}
            </div>
          )}
        </div>
      )}
      <br />
      <form className="w-full">
        {inputs.map((input, idx) => (
          <Input
            key={`${input.name}-${contractAddress}-${idx}`}
            input={input}
            value={formData[idx].value}
            idx={idx}
            formData={formData}
            setFormData={setFormData}
          />
        ))}

        <br />
      </form>
      <div className="flex flex-row justify-between w-full">
        <>
          {txWillError && (
            <p className="p-2">
              Tx will likely fail... Make sure you have proper permissions,
              enough money for gas, etc.
            </p>
          )}
        </>
        <button
          className={`ml-auto mr-0 border-2 p-2 ${
            txWillError ? "border-red-400" : "border-green-400"
          }`}
          onClick={async (e) => {
            e.preventDefault();
            if (stateMutability === "view") {
              const result = await viewRefetch();
              console.log(result);
            } else {
              write?.();
            }
          }}
          disabled={txWillError}
        >
          {stateMutability === "view" ? "Refresh Query" : "Submit Transaction"}
        </button>
      </div>
    </div>
  );
};

export default Function;
