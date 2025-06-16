#!/bin/sh
set -e

echo "⏳ Waiting for MySQL to be ready..."
./wait-for.sh db:3306

echo "🚀 Starting Node.js app..."
exec node dist/server.js
