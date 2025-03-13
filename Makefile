.PHONY: rebuild build clean stop start boot

rebuild: stop clean build start

stop:
	@pm2 delete nextjs-glearning || true

clean:
	@rm -rf node_modules .next .cache package-lock.json pnpm-lock.yaml || true

build:
	@npm install --force
	@export NODE_OPTIONS="--max-old-space-size=4096"
	@npm run build

start:
	@pm2 start npm --name "nextjs-glearning" -- start

boot:
	@pm2 startup
