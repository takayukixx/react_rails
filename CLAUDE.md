# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a full-stack React + Rails application with a Docker-based development environment:

- **Frontend**: Next.js 15.3.1 with React 19, TypeScript, and Tailwind CSS 4
- **Backend**: Rails 7.1.5+ API-only application with Ruby 3.2.8
- **Database**: PostgreSQL 16
- **Containerization**: Docker with docker-compose for orchestration

The project structure follows a monorepo pattern with separate `frontend/` and `backend/` directories under `app/`.

### Key Architecture Points

- Rails backend serves as an API-only application (no views)
- Next.js frontend handles all UI and client-side routing
- Cross-origin requests enabled via rack-cors gem
- Separate Docker containers for frontend, backend, and database
- Volume mounts for hot reloading during development

## Development Commands

### Docker Environment (Primary Development Method)

Start the entire stack:
```bash
cd app/
docker-compose up
```

Build and start with fresh builds:
```bash
cd app/
docker-compose up --build
```

Start in detached mode:
```bash
cd app/
docker-compose up -d
```

Access individual containers:
```bash
docker-compose exec back bash    # Rails backend shell
docker-compose exec front bash   # Next.js frontend shell
```

### Backend (Rails) Commands

Database operations:
```bash
docker-compose exec back rails db:create
docker-compose exec back rails db:migrate
docker-compose exec back rails db:seed
```

Run Rails server directly (inside container):
```bash
rails s -b '0.0.0.0'
```

Test commands:
```bash
docker-compose exec back bundle install  # Install gems after adding test gems
docker-compose exec back rspec           # Run all tests
docker-compose exec back rspec spec/models/  # Run model tests only
docker-compose exec back rspec spec/requests/  # Run request/API tests only
docker-compose exec back rspec --format documentation  # Detailed output
```

Linting and formatting commands:
```bash
docker-compose exec back bundle install  # Install gems after adding RuboCop gems
docker-compose exec back rubocop         # Run RuboCop linter
docker-compose exec back rubocop -a      # Auto-fix violations
docker-compose exec back rubocop --format simple  # Simple output format
docker-compose exec back rubocop app/    # Lint specific directory
```

### Frontend (Next.js) Commands

Development server:
```bash
cd app/frontend/
npm run dev       # Uses --turbopack flag
```

Build and production commands:
```bash
cd app/frontend/
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint check
```

Test commands:
```bash
cd app/frontend/
npm install       # Install packages after adding test dependencies
npm test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
docker-compose exec front npm test  # Run tests in Docker
```

Linting and formatting commands:
```bash
cd app/frontend/
npm install       # Install packages after adding linting dependencies
npm run lint      # Run ESLint
npm run lint:fix  # Auto-fix ESLint violations
npm run lint:strict   # Lint with no warnings allowed
npm run format    # Format code with Prettier
npm run format:check  # Check if code is formatted
docker-compose exec front npm run lint  # Run linting in Docker
```

## Port Configuration

- **Frontend**: http://localhost:8000 (mapped from container port 3000)
- **Backend**: http://localhost:3000 (Rails API)
- **Database**: localhost:5432 (PostgreSQL)

## Environment Setup

1. Create environment file for backend:
   ```bash
   touch ./app/backend/.env.local
   ```

2. Build and start containers:
   ```bash
   cd app/
   docker-compose build
   docker-compose up
   ```

3. Initialize database:
   ```bash
   docker-compose exec back rails db:create
   ```

## Technology Stack Details

**Frontend Dependencies:**
- React 19.0.0 with Next.js 15.3.1
- TypeScript 5
- Tailwind CSS 4 with PostCSS
- ESLint 9 with comprehensive rules and plugins
- Prettier for code formatting
- Uses npm for package management
- Jest for testing framework
- React Testing Library for component testing
- Jest DOM for DOM testing utilities

**Backend Dependencies:**
- Rails 7.1.5+ (API-only mode)
- PostgreSQL adapter (pg gem)
- Puma web server
- Bootsnap for faster boot times
- rack-cors for CORS handling
- RSpec Rails for testing
- FactoryBot Rails for test data
- SimpleCov for code coverage
- Shoulda Matchers for model testing
- RuboCop for code linting and formatting
- RuboCop Rails, RSpec, Performance extensions

## Testing Configuration

**Backend (Rails):**
- RSpec as primary testing framework
- FactoryBot for test data generation
- SimpleCov for code coverage (80% minimum)
- Shoulda Matchers for model validations
- Database Cleaner for test isolation
- Test directory: `spec/` with standard Rails structure

**Frontend (Next.js):**
- Jest as testing framework with Next.js integration
- React Testing Library for component testing
- Coverage threshold: 80% for all metrics
- Test directory: `__tests__/` for test files
- `jest.setup.js` for global test configuration

## Linting Configuration

**Backend (Rails):**
- RuboCop as primary linting tool
- Rails, RSpec, Performance specific cops enabled
- 120 character line length limit
- Double quotes for strings enforced
- Frozen string literals enabled
- Comprehensive rules for code quality and consistency

**Frontend (Next.js):**
- ESLint 9 with flat config format
- TypeScript, React, Hooks, A11y, Import plugins
- Prettier integration for code formatting
- Comprehensive rules for code quality
- Import sorting and organization enforced
- Next.js specific optimizations

## Docker Configuration Notes

- Frontend uses Node.js 21.5.0 base image with npm
- Backend uses Ruby 3.2.8 base image with PostgreSQL client
- Named volumes for PostgreSQL data persistence and Node.js optimization
- Platform specification for AMD64 compatibility
- Docker containers use npm commands (not yarn)