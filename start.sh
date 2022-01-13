npm install 
npm install dotenv
pm2 delete arbitrumScan
pm2 delete polygonScan
pm2 delete fantomScan
pm2 delete bscScan
pm2 delete avaxScan
pm2 delete auroraScan
pm2 delete ethScan

rm -rf planft-node-bsc
rm -rf planft-node-avax
rm -rf planft-node-fantom
rm -rf planft-node-polygon
rm -rf planft-node-aurora
rm -rf planft-node-arbitrum

# pm2 start ./start/polygon/polygon_on.js -n polygon_on
pm2 start ./start/polygon/polygon_scan.js -n polygon_scan
pm2 start ./start/polygon/polygon_setToken.js -n polygon_setToken

# pm2 start ./start/eth/eth_on.js -n eth_on
pm2 start ./start/eth/eth_scan.js -n eth_scan
pm2 start ./start/eth/eth_setToken.js -n eth_setToken

# pm2 start ./start/avax/avax_on.js -n avax_on
pm2 start ./start/avax/avax_scan.js -n avax_scan
pm2 start ./start/avax/avax_setToken.js -n avax_setToken

# pm2 start ./start/aurora/aurora_on.js -n aurora_on
pm2 start ./start/aurora/aurora_scan.js -n aurora_scan
pm2 start ./start/aurora/aurora_setToken.js -n aurora_setToken

# pm2 start ./start/arbitrum/arbitrum_on.js -n arbitrum_on
pm2 start ./start/arbitrum/arbitrum_scan.js -n arbitrum_scan
pm2 start ./start/arbitrum/arbitrum_setToken.js -n arbitrum_setToken

# pm2 start ./start/bsc/bsc_on.js -n bsc_on
pm2 start ./start/bsc/bsc_scan.js -n bsc_scan
pm2 start ./start/bsc/bsc_setToken.js -n bsc_setToken

# pm2 start ./start/fantom/fantom_on.js -n fantom_on
pm2 start ./start/fantom/fantom_scan.js -n fantom_scan
pm2 start ./start/fantom/fantom_setToken.js -n fantom_setToken