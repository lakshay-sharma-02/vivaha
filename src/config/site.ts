export const siteConfig = {
  name: "Vivaha",
  description: "A premium matrimonial platform focused on trust, privacy, verification, and meaningful relationships.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "https://vivaha.com/og.jpg",
  links: {
    twitter: "https://twitter.com/vivaha",
    github: "https://github.com/vivaha",
  },
}

export type SiteConfig = typeof siteConfig
