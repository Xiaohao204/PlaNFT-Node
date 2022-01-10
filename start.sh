npm install 
npm install dotenv
pm2 start polygon_on.js -n polygon_on
pm2 start polygon_scan.js -n polygon_scan
pm2 start polygon_setToken.js -n polygon_setToken
pm2 start eth_on.js -n eth_on
pm2 start eth_scan.js -n eth_scan
pm2 start eth_setToken.js -n eth_setToken