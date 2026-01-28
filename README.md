# Heritage Heart Transition Progress Tracker

A modern, automated CI/CD pipeline for deploying the Senior Move Management transition checklist web application.

## Project Overview

Heritage Heart Senior Move Managers helps clients downsize and transition into assisted living facilities. This repository contains the **Transition Progress Tracker**, a static web application that families use to coordinate move-in dates and utility transfers.

The project features a fully automated CI/CD pipeline that ensures updates are deployed safely and instantly to production.

## Features

- **Beautiful, Responsive Design**: Warm, trustworthy aesthetic designed for families
- **Interactive Progress Tracking**: Real-time task completion tracking with visual feedback
- **Local State Persistence**: Progress saved automatically in browser localStorage
- **Print-Friendly**: Optimized print stylesheet for physical checklists
- **Automated CI/CD Pipeline**: Lint, validate, and deploy on every push

## Quick Start

### Prerequisites

- Git installed on your machine
- A GitHub account
- Node.js 18+

### Initial Setup

1. **Create a new GitHub repository**

2. **Copy this repository and push to your GitHub**
   ```bash
   # Navigate to the project directory
   cd transition-tracker
   
   # Add all files
   git add .
   
   # Create initial commit
   git commit -m "Initial commit"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The pipeline will automatically deploy on the next push

4. **Wait for deployment**
   - Go to the **Actions** tab in your repository
   - Watch the workflow run (takes ~1-2 minutes)

### CI/CD Pipeline

The pipeline consists of two distinct stages:

#### Stage 1: Lint & Validate
- Validates HTML syntax using HTMLHint
- Lints CSS files using Stylelint
- Lints JavaScript using ESLint
- Verifies all required files exist
- Runs on both PRs and pushes to main

#### Stage 2: Deploy
- Deploys to GitHub Pages
- Only runs on successful push to main branch
- Uses GitHub's official Pages deployment actions
- Automatic URL generation

## Local Development

### Running Locally

1. **Install dependencies** (optional, for linting)
   ```bash
   npm install
   ```

2. **Run local server**
   ```bash
   npm run serve
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

### Running Linters Locally

```bash
# Run all linters
npm run lint

# Run individual linters
npm run lint:html
npm run lint:css
npm run lint:js
```