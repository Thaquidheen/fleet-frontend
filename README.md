# Fleet Management Frontend

A comprehensive fleet management system built with modern web technologies.

## Overview

This monorepo contains multiple applications and shared packages for fleet management:

- **Admin Dashboard**: Next.js application for administrators
- **Operations Dashboard**: React application for operations team
- **Driver Mobile App**: React Native application for drivers
- **Shared Packages**: Reusable components, utilities, and API clients

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Lerna (for monorepo management)

### Installation

```bash
npm install
npx lerna bootstrap
```

### Development

```bash
# Start all packages
npx lerna run dev --parallel

# Build all packages
npx lerna run build
```

## Project Structure

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed project structure.

## Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for contribution guidelines.

## License

[License information]
