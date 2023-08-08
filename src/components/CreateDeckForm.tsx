import { useForm } from "@/hooks/useForm";
import { Button } from "./forms/Button";
import {
  isPresent,
  maxChars,
  minChars,
} from "tiny-validation/build/main/lib/validators";
import { FComponent } from "@/types/common";
import TextInput from "./forms/TextInput";

export const CreateDeckForm: FComponent<{ onClose?: () => void }> = ({
  onClose,
}) => {
  const submit = async ({
    name,
  }: // description
  {
    name: string;
    // description: string;
  }) => {
    console.log({
      name,
      // description
    });
    onClose?.();
    return Promise.resolve();
  };

  const {
    handleSubmit,
    handleFieldChange,
    isSubmitting,
    isDisabled,
    values,
    errors,
  } = useForm({
    onSubmit: submit,
    stableSchema,
    initialValues: {
      name: "",
      // description: ''
    },
  });
  console.log(errors);

  return (
    <div className="">
      <div>What is the topic of this flash deck?</div>
      <form className="grid gap-2" onSubmit={handleSubmit}>
        <TextInput
          id="name"
          name="name"
          type="text"
          data-1p-ignore
          value={values.name}
          onChange={(name) => handleFieldChange({ name: "name", value: name })}
          placeholder="Useful math formulas"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
        {/* <input
          id="description"
          name="description"
          type="text"
          value={values.description}
          onChange={handleFieldChange}
          placeholder="50 calcululs and algebra formulas from high school and college."
          required
          className="mt-1 block w-full appearance-none rounded-md bg-black border border-gray-600 px-3 py-2 placeholder-gray-500 text-gray-300 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        /> */}
        <Button type="submit" isSubmitting={isSubmitting}>
          Create
        </Button>
      </form>
    </div>
  );
};

const stableSchema = {
  name: [isPresent(), minChars(10), maxChars(50)],
  // description: [isPresent(), minChars(10), maxChars(255)]
};
