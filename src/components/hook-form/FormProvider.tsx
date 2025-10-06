'use client';

import { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues = FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;
}

export default function FormProvider<T extends FieldValues = FieldValues>({ children, onSubmit, methods }: Props<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
