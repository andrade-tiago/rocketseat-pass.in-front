import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeadProps extends ComponentProps<"th"> {}

export function TableHeader(props: TableHeadProps) {
  return (
    <th {...props} className={twMerge("py-3 px-4 text-sm font-semibold text-left", props.className)} />
  )
}