# stop polygon service
pm2 delete polygon_on
pm2 delete polygon_scan
pm2 delete polygon_setToken

# stop eth service
pm2 delete eth_on
pm2 delete eth_scan
pm2 delete eth_setToken

# stop avax service
pm2 delete avax_on
pm2 delete avax_scan
pm2 delete avax_setToken

# stop aurora service
pm2 delete aurora_on
pm2 delete aurora_scan
pm2 delete aurora_setToken

# stop fantom service
pm2 delete fantom_on
pm2 delete fantom_scan
pm2 delete fantom_setToken

# stop bsc service
pm2 delete bsc_on
pm2 delete bsc_scan
pm2 delete bsc_setToken

# stop arbitrum service
pm2 delete arbitrum_on
pm2 delete arbitrum_scan
pm2 delete arbitrum_setToken