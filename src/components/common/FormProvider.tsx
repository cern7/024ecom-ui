import React from "react";
import { UseFormReturn, FormProvider as RHFProvider } from "react-hook-form";

interface FormProviderProps {
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export const FormProvider = ({
  methods,
  onSubmit,
  children,
}: FormProviderProps) => {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </RHFProvider>
  );
};
