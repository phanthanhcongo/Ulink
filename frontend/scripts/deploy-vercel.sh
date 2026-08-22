#!/bin/sh
set -e

echo ">> Installing Vercel CLI..."
npm install -g vercel --no-audit --no-fund --loglevel=error

echo ">> Pulling Vercel project config..."
vercel pull --yes --environment=production --token="$VERCEL_TOKEN"

echo ">> Building for production..."
vercel build --prod --token="$VERCEL_TOKEN"

echo ">> Deploying to Vercel..."
vercel deploy --prebuilt --prod --token="$VERCEL_TOKEN"

echo ">> Frontend deployed to Vercel successfully!"
