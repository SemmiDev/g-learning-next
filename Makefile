.PHONY: rebuild build stop start boot

rebuild: stop build start

stop:
	@pm2 delete nextjs-glearning || true

build:
	@npm install --force
	@NODE_OPTIONS="--max-old-space-size=2048" npm run build

start:
	@pm2 start npm --name "nextjs-glearning" -- start

boot:
	@pm2 startup
