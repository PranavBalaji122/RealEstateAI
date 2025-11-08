# RealEstate AI Frontend

A modern, AI-powered property management platform built with Next.js, React, and TypeScript.

## Features

- **Neumorphic Design**: Beautiful soft UI design with custom neumorphic components
- **AI Insights**: AI-powered property insights and recommendations
- **Dashboard**: Customizable dashboard with drag-and-drop widgets
- **Property Management**: Comprehensive property tracking and management
- **Tenant Management**: Track and manage tenants with ease
- **Maintenance**: Maintenance request tracking and management
- **Calendar**: Schedule and manage appointments
- **Messages**: Built-in messaging system
- **Payments**: Payment tracking and management
- **Insights**: Analytics and reporting

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Drag & Drop**: [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles & neumorphic utilities
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── widgets/          # Dashboard widgets
│   ├── figma/            # Figma-related components
│   ├── App.tsx           # Main app component
│   ├── DarkSidebar.tsx   # Sidebar navigation
│   └── ...               # Other page components
├── lib/                   # Utility functions
│   ├── utils.ts          # General utilities
│   └── use-mobile.ts     # Mobile detection hook
├── public/               # Static assets
│   └── images/           # Image files
└── ...                   # Config files

```

## Development

### Building for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Customization

### Design System

The app uses a custom neumorphic design system defined in [app/globals.css](app/globals.css). Color scheme and shadow utilities can be customized there.

Key CSS utilities:
- `.neu-flat` - Flat neumorphic surface
- `.neu-pressed` - Pressed/inset surface
- `.neu-card` - Elevated card surface
- `.neu-button` - Button surface with hover states

### Adding Components

To add new shadcn/ui components, visit [ui.shadcn.com](https://ui.shadcn.com/) and follow their installation guide. Components are located in [components/ui/](components/ui/).

## License

This project uses components from [shadcn/ui](https://ui.shadcn.com/) under the MIT License.

Photos from [Unsplash](https://unsplash.com) are used under their [license](https://unsplash.com/license).

## Attribution

See [Attributions.md](Attributions.md) for full attribution details.
