.PHONY: rebuild

rebuild: 
	@cd /home/garuda/smartthink && git pull origin main && npm install --force && git restore package-lock.json && export NODE_OPTIONS=--max-old-space-size=4096 && npm run build && pm2 delete nextjs-glearning || true && pm2 start npm --name "nextjs-glearning" -- start -- -p 3000
