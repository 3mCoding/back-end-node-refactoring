module.exports = {
    apps : [{
      name: 'tmc',
      script: './bin/www',
  
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
        PORT:3004
      }
    }]
  };
  