module.exports = {
  apps: [{
    name: 'carla-lucebot',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    },
    exp_backoff_restart_delay: 100,
    kill_timeout: 3000,
    wait_ready: true
  }]
}; 