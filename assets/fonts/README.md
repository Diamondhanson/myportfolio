# Fonts for the link preview card

`components/og-card.tsx` renders through Satori, which cannot use `next/font`
and needs the raw font bytes. These three files are read at build time.

Both families are under the SIL Open Font License 1.1, which permits
redistribution inside a project like this one.

- Space Grotesk, Florian Karsten. https://fonts.google.com/specimen/Space+Grotesk
- IBM Plex Mono, IBM. https://fonts.google.com/specimen/IBM+Plex+Mono
