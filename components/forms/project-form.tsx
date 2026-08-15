'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectFormSchema, type ProjectFormData } from '@/lib/validations/project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, Save } from 'lucide-react'

interface ProjectFormProps {
  initialData?: ProjectFormData | null
  isSubmitting: boolean
  onSubmit: (data: ProjectFormData) => void
}

const defaultValues: ProjectFormData = {
  title: '',
  slug: '',
  description: '',
  thumbnail_url: '',
  tech_stack_input: '',
  live_url: '',
  repository_url: '',
  is_featured: false,
}

/**
 * Form reusable untuk create & edit project.
 * Mode ditentukan oleh prop `initialData`:
 * - null/undefined → create mode
 * - object → edit mode (form di-pre-fill)
 */
export function ProjectForm({ initialData, isSubmitting, onSubmit }: ProjectFormProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData ?? defaultValues,
  })

  // Re-populate form saat initialData berubah (switch antar edit targets)
  useEffect(() => {
    form.reset(initialData ?? defaultValues)
  }, [initialData, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Judul */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Proyek *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Contoh: E-Commerce SaaS Platform"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (URL)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e-commerce-saas (kosongkan untuk auto-generate)"
                  disabled={isSubmitting}
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Jika dikosongkan, slug akan dibuat otomatis dari judul.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Deskripsi */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Jelaskan proyek ini..."
                  rows={4}
                  disabled={isSubmitting}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thumbnail URL */}
        <FormField
          control={form.control}
          name="thumbnail_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://... (URL gambar dari Supabase Storage)"
                  disabled={isSubmitting}
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Upload gambar ke bucket `thumbnails` di Supabase Storage, lalu paste URL publiknya.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tech Stack */}
        <FormField
          control={form.control}
          name="tech_stack_input"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <FormControl>
                <Input
                  placeholder="Next.js, TypeScript, Supabase, TailwindCSS"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Pisahkan setiap teknologi dengan koma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Live URL */}
        <FormField
          control={form.control}
          name="live_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://project-anda.com"
                  disabled={isSubmitting}
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Repository URL */}
        <FormField
          control={form.control}
          name="repository_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/username/repo"
                  disabled={isSubmitting}
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Featured Toggle */}
        <FormField
          control={form.control}
          name="is_featured"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border border-border/40 p-3">
              <div className="space-y-0.5">
                <FormLabel>Tampilkan sebagai Featured</FormLabel>
                <FormDescription>
                  Proyek featured muncul dengan badge khusus di homepage.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {initialData ? 'Simpan Perubahan' : 'Buat Proyek'}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}