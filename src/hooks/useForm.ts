import { z } from "zod";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useForm = <T extends z.ZodType>(schema: T) => {
  return useHookForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
};
