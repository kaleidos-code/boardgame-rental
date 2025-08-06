#!/bin/sh

echo "Starting database setup..."

# Simple retry loop with sleep
echo "Waiting for database to be ready..."
sleep 10

# Generate Prisma client first
echo "Generating Prisma client..."
npx prisma generate

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Push any schema changes
echo "Pushing schema changes..."
npx prisma db push

echo "Database setup completed!"

echo "Starting application..."
exec yarn start