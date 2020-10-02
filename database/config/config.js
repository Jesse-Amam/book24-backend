require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}
//   ssh root@207.154.240.86 projectBook24ng
// sudo certbot --nginx -d book24.ng -d www.book24.ng  sudo certbot renew --dry-run
//  sudo certbot renew --dry-run