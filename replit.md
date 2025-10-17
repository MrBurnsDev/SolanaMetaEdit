# Overview

This is a Solana NFT Metadata Editor application built with React/Vite frontend and Express.js backend. The application allows users to connect their Phantom wallet, verify authority over NFTs, and edit metadata for individual NFTs or entire collections. It follows a phased development approach with plans for single NFT editing, collection editing, and advanced features like emergency royalty management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with Vite**: Modern build tooling with fast HMR for development
- **TypeScript**: Full type safety across the application
- **Tailwind CSS + shadcn/ui**: Utility-first CSS framework with accessible component library using Radix UI primitives
- **Wouter**: Lightweight client-side routing instead of React Router
- **React Hook Form + Zod**: Form handling with schema validation
- **TanStack Query**: Server state management and caching for API calls

## Backend Architecture
- **Express.js**: REST API server with TypeScript support
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **In-memory storage fallback**: MemStorage class provides development storage when database is unavailable
- **ESM modules**: Modern JavaScript module system throughout

## Database Design
- **PostgreSQL with Drizzle**: Relational database with type-safe ORM
- **Key tables**: users, nft_metadata, transactions, authorities
- **JSONB fields**: Flexible storage for creators arrays and attributes
- **UUID primary keys**: Generated using PostgreSQL's gen_random_uuid()

## Solana Integration
- **Wallet Adapter**: Standard Solana wallet connection with Phantom support
- **UMI Framework**: Metaplex's Universal Module Interface for NFT operations
- **Authority Verification**: PDA-based authority checking before allowing edits
- **Transaction Building**: Server-side transaction construction with client-side signing

## State Management
- **React Query**: Server state, caching, and API synchronization
- **React Context**: Wallet connection state and user preferences
- **Form State**: React Hook Form for complex form management with validation

## Security Model
- **Authority-based access**: Users can only edit NFTs they have authority over
- **PDA verification**: Program Derived Address checks for ownership validation
- **Service fees**: Automatic treasury wallet transfers for monetization
- **Transaction signing**: Client-side signing maintains security while server builds transactions

## Development Environment
- **Vite plugins**: Runtime error overlays, cartographer for Replit integration
- **Hot reload**: Development server with fast refresh capabilities
- **Path aliases**: Clean imports using @ prefixes for components and shared code
- **ESBuild**: Fast production bundling for both client and server

## API Architecture
- **RESTful endpoints**: Standard HTTP methods for resource management
- **JSON schema validation**: Zod schemas shared between client and server
- **Error handling**: Centralized error middleware with proper status codes
- **Logging**: Request/response logging with performance metrics

# External Dependencies

## Solana Ecosystem
- **@solana/web3.js**: Core Solana blockchain interaction
- **@solana/wallet-adapter-***: Wallet connection and management
- **@metaplex-foundation/umi**: Universal Module Interface for NFT operations
- **@metaplex-foundation/mpl-token-metadata**: Token metadata program interaction

## Helius Integration
- **Helius DAS API**: Digital Asset Standard API for NFT collection data
- **axios**: HTTP client for Helius API requests
- **Collection browsing**: Search NFTs by collection, creator, or owner address
- **Asset metadata**: Fetch comprehensive NFT metadata and attributes

## Database & Storage
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **drizzle-kit**: Database migration and management tools

## UI Framework
- **@radix-ui/react-***: Accessible, unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library
- **class-variance-authority**: Type-safe variant management for components

## State Management
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers

## Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Validation & Utilities
- **zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation