/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://smartsparkservices.com',
  generateRobotsTxt: true,
  exclude: ['/admin*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/']
      }
    ]
  }
}
