'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { trackFormSchema, type TrackFormData } from '@/lib/validations/track'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

interface TrackFormProps {
  initialData?: TrackFormData | null
  isSubmitting: boolean
  onSubmit: (data: TrackFormData) => void
}

const defaultValues: TrackFormData = {
  title: '',
  genre: '',
  audio_url: '',
  duration: '',
}

/**
 * Form reusable untuk create & edit track audio.
 */
export function TrackForm({ initialData, isSubmitting, onSubmit }: TrackFormProps) {
  const form = useForm<TrackFormData>({
    resolver: zodResolver(trackFormSchema),
    defaultValues: initialData ?? defaultValues,
  })

  // Re-populate form saat initialData berubah
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
              <FormLabel>Judul Track *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Contoh: Blues in E Minor"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Genre */}
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Blues, Rock, Jazz, dll."
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Audio URL */}
        <FormField
          control={form.control}
          name="audio_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Audio URL *</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://... (URL file dari Supabase Storage)"
                  disabled={isSubmitting}
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Upload file audio ke bucket `audio` di Supabase Storage, lalu paste URL publiknya.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durasi (detik)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="145"
                  disabled={isSubmitting}
                  className="font-mono"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Kosongkan jika tidak diketahui.
              </FormDescription>
              <FormMessage />
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
              {initialData ? 'Simpan Perubahan' : 'Tambah Track'}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}