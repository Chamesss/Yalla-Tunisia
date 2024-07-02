import { Button, Input } from "@nextui-org/react";
import { Dispatch, RefObject, SetStateAction } from "react";

type PropsMain = {
  inputRef: RefObject<HTMLInputElement>;
  setInputs: Dispatch<SetStateAction<string[]>>;
  inputs: string[];
  resRef: RefObject<HTMLDivElement>;
};

export default function Restrictions({
  inputRef,
  setInputs,
  inputs,
  resRef,
}: PropsMain) {
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    if (resRef.current) {
      resRef.current.style.height = `${
        parseInt(resRef.current.style.height) -
        // @ts-ignore
        (inputRef.current?.scrollHeight + 55)
      }px`;
    }
  };

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
    if (resRef.current) {
      resRef.current.style.height = `${
        parseInt(resRef.current.style.height) +
        // @ts-ignore
        inputRef.current?.scrollHeight +
        55
      }px`;
    }
  };

  return (
    <div ref={resRef} className="flex flex-col gap-4 h-fit transition-all">
      <h1 className="text-xl font-semibold">Restrictions</h1>
      <input
        className="absolute hidden"
        value={inputs.length}
        name="restrictionLength"
      />
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-4">
          <Input
            name={`restriction-${index}`}
            ref={inputRef}
            label={`Restriction ${index + 1}`}
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
            size="sm"
          />
          {index > 0 && ( // Render remove button for additional inputs
            <button
              type="button"
              onClick={() => handleRemoveInput(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-full hover:opacity-80 transition-all"
            >
              -
            </button>
          )}
        </div>
      ))}
      <Button
        onClick={handleAddInput}
        className=" bg-primary-500 text-white w-fit m-auto"
      >
        + Ajouter une restriction
      </Button>
    </div>
  );
}
