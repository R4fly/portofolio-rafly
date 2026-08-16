import type { SVGProps } from 'react'

/**
 * LinkedIn brand icon — custom SVG.
 *
 * lucide-react menghapus brand icons sejak v1.x (alasan trademark),
 * jadi kita buat custom SVG mengikuti pola GithubIcon.
 * Source: simple-icons (CC0 license).
 */
export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771S.792.048.792 1.489v21.022c0 1.441.979 1.489.979 1.489h20.454s.979-.048.979-1.489V1.489S23.204 0 22.225 0z" />
    </svg>
  )
}