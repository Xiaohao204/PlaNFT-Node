npm install 
npm install dotenv
pm2 start polygon_on.js -n polygon_on
pm2 start polygon_scan.js -n polygon_scan
pm2 start polygon_setToken.js -n polygon_setToken