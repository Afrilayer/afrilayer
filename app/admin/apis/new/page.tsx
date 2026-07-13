'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const apiSchema = z.object({
  name: z.string().min(1, 'API name is required'),
  provider_id: z.string().min(1, 'Provider is required'),
  description: z.string().min(1, 'Description is required'),
  short_summary: z.string().optional(),
  documentation_url: z.string().url('Must be a valid URL').optional(),
  official_website: z.string().url('Must be a valid URL').optional(),
  pricing_model: z.string().optional(),
  auth_method: z.string().optional(),
  sandbox_url: z.string().url('Must be a valid URL').optional(),
  status: z.enum(['active', 'deprecated', 'beta']),
  api_version: z.string().optional(),
  rate_limit: z.string().optional(),
  webhook_support: z.boolean(),
  support_email: z.string().email('Must be a valid email').optional(),
  support_url: z.string().url('Must be a valid URL').optional(),
  listing_status: z.enum(['draft', 'published', 'archived']),
});

type ApiFormData = z.infer<typeof apiSchema>;

export default function NewApiPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiFormData>({
    resolver: zodResolver(apiSchema),
  });

  const onSubmit = (data: ApiFormData) => {
    console.log(data);
    // TODO: Submit to Supabase
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Add New API
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                API Name
              </label>
              <input
                {...register('name')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Provider
              </label>
              <select
                {...register('provider_id')}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="">Select a provider</option>
                <option value="1">MTN Group</option>
                <option value="2">Paystack</option>
                <option value="3">Dojah</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links & Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Documentation URL
              </label>
              <input
                {...register('documentation_url')}
                type="url"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Official Website
              </label>
              <input
                {...register('official_website')}
                type="url"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sandbox URL
              </label>
              <input
                {...register('sandbox_url')}
                type="url"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save API</Button>
        </div>
      </form>
    </div>
  );
}