.PHONY: rebuild build stop start boot

rebuild: stop clean build start

stop:
	@pm2 delete nextjs-glearning || true

clean:
	@npm run clean

build:
	@npm install --force
	@NEXT_DISABLE_ESLINT=1 NODE_OPTIONS="--max-old-space-size=2048" npm run build

start:
	@pm2 start npm --name "nextjs-glearning" -- start

boot:
	@pm2 startup
