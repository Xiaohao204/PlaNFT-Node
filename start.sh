npm install 
npm install mysql
npm install dotenv

pm2 delete polygon_scan
# pm2 delete eth_scan
# pm2 delete avax_scan
# pm2 delete aurora_scan
# pm2 delete arbitrum_scan
# pm2 delete bsc_scan
# pm2 delete fantom_scan

pm2 delete polygon_setToken
# pm2 delete eth_setToken
# pm2 delete avax_setToken
# pm2 delete aurora_setToken
# pm2 delete arbitrum_setToken
# pm2 delete bsc_setToken
# pm2 delete fantom_setToken

# pm2 start ./running/polygon/polygon_on.js -n polygon_on
pm2 start ./running/polygon/polygon_scan.js -n polygon_scan
pm2 start ./running/polygon/polygon_setToken.js -n polygon_setToken

# # pm2 start ./running/eth/eth_on.js -n eth_on
# pm2 start ./running/eth/eth_scan.js -n eth_scan
# pm2 start ./running/eth/eth_setToken.js -n eth_setToken

# # pm2 start ./running/avax/avax_on.js -n avax_on
# pm2 start ./running/avax/avax_scan.js -n avax_scan
# pm2 start ./running/avax/avax_setToken.js -n avax_setToken

# # pm2 start ./running/aurora/aurora_on.js -n aurora_on
# pm2 start ./running/aurora/aurora_scan.js -n aurora_scan
# pm2 start ./running/aurora/aurora_setToken.js -n aurora_setToken

# # pm2 start ./running/arbitrum/arbitrum_on.js -n arbitrum_on
# pm2 start ./running/arbitrum/arbitrum_scan.js -n arbitrum_scan
# pm2 start ./running/arbitrum/arbitrum_setToken.js -n arbitrum_setToken

# # pm2 start ./running/bsc/bsc_on.js -n bsc_on
# pm2 start ./running/bsc/bsc_scan.js -n bsc_scan
# pm2 start ./running/bsc/bsc_setToken.js -n bsc_setToken

# # pm2 start ./running/fantom/fantom_on.js -n fantom_on
# pm2 start ./running/fantom/fantom_scan.js -n fantom_scan
# pm2 start ./running/fantom/fantom_setToken.js -n fantom_setToken