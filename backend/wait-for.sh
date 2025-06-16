#!/bin/sh

host=$(echo $1 | cut -d : -f 1)
port=$(echo $1 | cut -d : -f 2)

shift

until nc -z "$host" "$port"; do
  echo "⏳ Waiting for $host:$port to be available..."
  sleep 1
done

exec "$@"
