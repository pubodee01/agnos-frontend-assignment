import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps) => (
  <div className={cn("container mx-auto", className)} {...props}>
    {children}
  </div>
);
