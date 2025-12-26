# jonah-chan
Development website built with Next.js.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## GitHub Pages Deployment

This project is configured for static export (`output: "export"`) and deploys to GitHub Pages via the workflow in `.github/workflows/gh-pages.yml`.

Steps:

1. Push to `main` to trigger the workflow.
2. In your GitHub repo settings, enable Pages and select "GitHub Actions" as the source.
3. Ensure your repository name matches the deployed base path, or set `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>` in the workflow.

Local export test:

```bash
NEXT_PUBLIC_BASE_PATH="/<repo-name>" npm run build
```

The static output will be in `out/`.

## Contact Form Configuration

Set `NEXT_PUBLIC_FORM_ENDPOINT` to your hosted form provider endpoint. The contact form posts to this URL.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
