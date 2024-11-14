.PHONY: rebuild build stop start boot

rebuild: stop build start

stop:
	@/home/glearning/.nvm/versions/node/v22.11.0/bin/pm2 delete nextjs-glearning || true

build:
	@NODE_OPTIONS="--max-old-space-size=4096" /home/glearning/.nvm/versions/node/v22.11.0/bin/npm run build

start:
	@/home/glearning/.nvm/versions/node/v22.11.0/bin/pm2 start npm --name "nextjs-glearning" -- start

boot:
	@/home/glearning/.nvm/versions/node/v22.11.0/bin/pm2 startup
