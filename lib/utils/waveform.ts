/**
 * Utility untuk menghasilkan waveform peaks dari audio array.
 * Digunakan sebagai fallback jika waveform_data dari database kosong.
 */

/**
 * Generate synthetic waveform peaks untuk preview visual.
 * Menghasilkan pola gelombang sinusoidal yang natural dengan variasi acak.
 */
export function generateSyntheticPeaks(length: number = 100): number[] {
  const peaks: number[] = []
  
  for (let i = 0; i < length; i++) {
    // Kombinasi multiple sine waves untuk pola natural
    const x = i / length
    const wave1 = Math.sin(x * Math.PI * 4) * 0.3
    const wave2 = Math.sin(x * Math.PI * 8 + 0.5) * 0.2
    const wave3 = Math.sin(x * Math.PI * 2) * 0.4
    
    // Envelope: fade in di awal, fade out di akhir
    const envelope = Math.sin(x * Math.PI)
    
    // Random noise kecil untuk variasi natural
    const noise = (Math.random() - 0.5) * 0.1
    
    const value = Math.abs(wave1 + wave2 + wave3) * envelope + noise
    peaks.push(Math.min(1, Math.max(0, value)))
  }
  
  return peaks
}

/**
 * Parse waveform_data dari database (JSONB).
 * Return null jika tidak valid agar WaveSurfer bisa generate dari audio.
 */
export function parseWaveformData(rawData: unknown): number[][] | null {
  if (!Array.isArray(rawData) || rawData.length === 0) {
    return null
  }
  
  // Pastikan semua elemen adalah angka
  const isValidNumbers = rawData.every(
    (v) => typeof v === 'number' && !isNaN(v) && v >= 0 && v <= 1
  )
  
  if (!isValidNumbers) return null
  
  // WaveSurfer expects array of channels: [[ch1_peaks]]
  return [rawData as number[]]
}