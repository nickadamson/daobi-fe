import { JsonFragment, JsonFragmentType } from "@ethersproject/abi";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
interface Props {
  input: JsonFragmentType;
  value: any;
  idx: number;
  formData: any[];
  setFormData: Dispatch<SetStateAction<any[]>>;
}

const inputStyle =
  "w-full p-2 rounded border-2 border-black-900 focus:outline-1 focus:outline-blue-400";

const Input = ({ input, value, idx, formData, setFormData }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log({ e });
    let newData = formData;
    newData[idx].value = e.currentTarget.value;
    setFormData(() => [...newData]);
  };

  // field for each input based on type
  const renderInput = () => {
    switch (input.type) {
      case "address":
      // fallthrough
      case "string":
        return (
          <input
            className={inputStyle}
            type="text"
            value={value}
            onChange={(e) => handleChange(e)}
          />
        );
      case "bool":
        return (
          <input
            className={inputStyle}
            type="checkbox"
            value={value}
            onChange={(e) => handleChange(e)}
          />
        );

      default:
        if (input.type.includes("int")) {
          return (
            <input
              className={inputStyle}
              type="number"
              value={value}
              onChange={(e) => handleChange(e)}
            />
          );
        } else if (input.type.includes("bytes")) {
          return (
            <input
              className={inputStyle}
              type="text"
              value={value}
              onChange={(e) => handleChange(e)}
            />
          );
        } else {
          console.log(`Unknown Type: ${JSON.stringify(input)}`);
          return <p>Error, UnknownType</p>;
        }
    }
  };

  return (
    <div className="flex flex-col">
      <label>
        {`${input.name}(${input.type}):`}
        {/* field for each input based on type */}
        <br />
        {renderInput()}
        <br />
      </label>
    </div>
  );
};

export default Input;
