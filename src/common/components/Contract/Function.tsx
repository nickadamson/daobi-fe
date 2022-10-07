import Input from "./Input";
import { JsonFragment, JsonFragmentType } from "@ethersproject/abi";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useEffect, useState } from "react";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { formatIODefaultValues, toTrimmedAddress } from "@/utils/index";

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
  const [txWillError, setTxWillError] = useState(true); // block transactions until ethers can estimate gas
  const [errorMsg, setErrorMsg] = useState<null | string | Error>(
    "Tx will likely fail... Make sure you have proper permissions, enough money for gas, etc."
  );

  // FOR READ FUNCTIONS
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
    onError(error: any) {
      console.log("error", JSON.parse(JSON.stringify(error, null, 2)));
      setErrorMsg(
        JSON.stringify(
          (error?.reason ?? "") +
            " - " +
            (error?.error?.message ?? "") +
            " - " +
            (error?.code ?? "") +
            " - " +
            (error?.argument ?? "")
        )
      );
    },
  });

  // FOR WRITE FUNCTIONS
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
    onError(error: any) {
      console.log("Error: ", JSON.stringify(error));
      setTxWillError(true);
      setErrorMsg(
        JSON.stringify(
          (error?.reason ?? "") +
            " - " +
            (error?.error?.message ?? "") +
            " - " +
            (error?.code ?? "") +
            " - " +
            (error?.argument ?? "")
        )
      );
    },
  });

  // TODO: implement notification of Tx status
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const formattedViewData =
    typeof viewData !== "object"
      ? viewData
      : (viewData as BigNumberish)?.toString();

  // re-estimate when values change
  useEffect(() => {
    function refreshEstimates() {
      if (stateMutability === "view") {
        refetch();
      } else {
        viewRefetch();
      }
    }
    refreshEstimates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <div className="flex flex-col justify-between p-4 m-auto w-full h-full border-2">
      <p className="text-lg font-bold">{`${name} (${stateMutability})`}</p>
      {stateMutability === "view" && (
        <div>
          <br />
          {/* TODO: add visual indication of query status */}
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
            <p className="overflow-auto p-2 mr-2 border">
              {errorMsg && "ERROR: " + errorMsg}
            </p>
          )}
        </>
        <button
          className={`p-2 mt-auto mr-0 mb-0 ml-auto border-2 h-min ${
            txWillError ? "border-red-400" : "border-green-400"
          }`}
          onClick={async (e) => {
            e.preventDefault();
            if (stateMutability === "view") {
              viewRefetch();
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
