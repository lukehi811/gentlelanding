'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  address: z.string().min(4, 'Property address is required'),
  bedrooms: z.string().min(1, 'Please enter bedroom count'),
  message: z.string().min(8, 'Please share a bit more detail')
});

type FormValues = z.infer<typeof schema>;

export function PartnerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (_values: FormValues) => {
    // TODO: Replace with Resend/Formspree endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl bg-white p-6 text-text-dark shadow-luxe">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register('name')} className="input" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register('email')} type="email" className="input" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register('phone')} className="input" />
        </Field>
        <Field label="# of Bedrooms" error={errors.bedrooms?.message}>
          <input {...register('bedrooms')} className="input" />
        </Field>
      </div>
      <Field label="Property Address" error={errors.address?.message}>
        <input {...register('address')} className="input" />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <textarea {...register('message')} className="input min-h-28" />
      </Field>
      <Button type="submit" className="w-full">
        Request My Free Estimate
      </Button>
      {isSubmitSuccessful ? <p className="text-sm text-green-700">Thanks. We will follow up shortly.</p> : null}
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-700">{error}</span> : null}
    </label>
  );
}
