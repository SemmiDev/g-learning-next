.PHONY: rebuild

rebuild: 
	@cd /home/garuda/app && git pull && npm install --force && NODE_OPTIONS="--max-old-space-size=4096" npm run build && pm2 delete nextjs-glearning && pm2 start npm --name "nextjs-glearning" -- start && pm2 list