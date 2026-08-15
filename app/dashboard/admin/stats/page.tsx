'use client'

import { useState, useEffect } from 'react'
import { useLiveStatsRows, useUpdateStats } from '@/lib/queries/admin-stats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { BarChart3, Save, Loader2, Clock, Briefcase, Code2 } from 'lucide-react'
import { GithubIcon } from '@/components/shared/icons/github-icon'

/**
 * Konfigurasi label dan icon untuk setiap metric.
 * Menggunakan GithubIcon custom karena lucide-react menghapus brand icons.
 */
const METRIC_CONFIG: Record<
  string,
  { label: string; description: string; icon: React.ComponentType<{ className?: string }> }
> = {
  github_commits: {
    label: 'GitHub Commits',
    description: 'Total commit di semua repository',
    icon: GithubIcon,
  },
  hours_practiced: {
    label: 'Jam Latihan Gitar',
    description: 'Total jam latihan kumulatif',
    icon: Clock,
  },
  projects_active: {
    label: 'Proyek Aktif',
    description: 'Jumlah proyek yang sedang dikerjakan',
    icon: Briefcase,
  },
  lines_of_code: {
    label: 'Baris Kode',
    description: 'Total baris kode yang ditulis',
    icon: Code2,
  },
}

export default function AdminStatsPage() {
  const { data: stats, isLoading } = useLiveStatsRows()
  const updateStatsMutation = useUpdateStats()
  const [values, setValues] = useState<Record<string, number>>({})

  // Populate form values saat data berhasil di-load
  useEffect(() => {
    if (stats) {
      const initialValues: Record<string, number> = {}
      stats.forEach((stat) => {
        initialValues[stat.metric_key] = stat.metric_value
      })
      setValues(initialValues)
    }
  }, [stats])

  function handleChange(metricKey: string, rawValue: string): void {
    const parsed = parseInt(rawValue, 10)
    setValues((prev) => ({
      ...prev,
      [metricKey]: isNaN(parsed) ? 0 : parsed,
    }))
  }

  function handleSubmit(): void {
    const updates = Object.entries(values).map(([metric_key, metric_value]) => ({
      metric_key,
      metric_value,
    }))

    updateStatsMutation.mutate(updates, {
      onSuccess: () => {
        toast.success('Statistik diperbarui. Homepage akan ter-update secara realtime.')
      },
      onError: (error: Error) => {
        toast.error(`Gagal memperbarui statistik: ${error.message}`)
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-sans text-2xl font-bold tracking-tight">
          Live Stats Editor
        </h2>
        <p className="mt-1 text-muted-foreground">
          Perbarui angka statistik yang tampil di homepage. Perubahan disiarkan
          secara realtime ke semua pengunjung.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50">
              <CardHeader>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats Form */}
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(METRIC_CONFIG).map(([metricKey, config]) => {
              const Icon = config.icon
              return (
                <Card key={metricKey} className="border-border/40 bg-card/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="h-5 w-5 text-primary" />
                      {config.label}
                    </CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor={metricKey} className="sr-only">
                      {config.label}
                    </Label>
                    <Input
                      id={metricKey}
                      type="number"
                      min={0}
                      value={values[metricKey] ?? 0}
                      onChange={(e) => handleChange(metricKey, e.target.value)}
                      disabled={updateStatsMutation.isPending}
                      className="font-mono text-lg font-bold tabular-nums"
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={updateStatsMutation.isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {updateStatsMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan Perubahan
                </>
              )}
            </Button>
          </div>

          {/* Info Note */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Cara kerja:</strong> Saat Anda
                menyimpan, nilai di tabel <code className="font-mono">live_stats</code>{' '}
                diperbarui. Supabase Realtime kemudian menyiarkan perubahan ke homepage,
                sehingga angka di section &quot;Live Stats&quot; pengunjung berubah
                otomatis tanpa reload.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}