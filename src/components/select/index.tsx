import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps = Omit<SelectProps, "children"> & {
  isInvalid?: boolean;
  options: Option[];
  placeHolder?: string;
};

export function SingleSelect({
  isInvalid,
  options,
  placeHolder = "select option",
  ...props
}: SelectInputProps) {
  return (
    <Select {...props}>
      <SelectTrigger
        className={cn({
          "ring ring-destructive": isInvalid,
        })}
      >
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {options?.length ? (
          <>
            {options.map((option) => (
              <SelectItem key={`option-${option.value}`} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </>
        ) : (
          <SelectItem disabled value="">
            No option available
          </SelectItem>
        )}
        {/* <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem> */}
      </SelectContent>
    </Select>
  );
}
