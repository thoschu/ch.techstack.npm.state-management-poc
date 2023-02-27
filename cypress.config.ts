import { defineConfig } from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200',
    'blockHosts': ['*google-analytics.com'],
    'chromeWebSecurity': false,
    'video': true,
    'supportFile': 'cypress/support/commands.ts'
  }
})
