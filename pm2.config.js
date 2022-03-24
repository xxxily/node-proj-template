const watch = [
  'bin',
  'tests',
  'pm2.config.js',
  'playwright.config.ts',
  'package.json',
  'yarn.lock',
]
const commonConfig = {
  instances: 1,
  exec_mode: 'fork',
  watch,
  ignore_watch: [
    'log',
    'logs',
    'node_modules',
  ],
  max_restarts: 15,
  restart_delay: 5000,
  log_date_format: 'MM-DD HH:mm:ss',
  combine_logs: true,
  log_file: 'logs/pm2/combined.outerr.log',
  out_file: 'logs/pm2/out.log',
  error_file: 'logs/pm2/err.log',
  pid_file: 'logs/pm2/pid.log',

  /* 内存爆掉之前进行重启 */
  node_args: '--max-old-space-size=2048',
  max_memory_restart: '2000M',

  /* 允许多次启动同一个脚本 */
  force: false,
}

/**
 * https://pm2.keymetrics.io/docs/usage/application-declaration/
 */
const pm2Config = {
  apps: [
    {
      name: 'main',
      script: 'bin/index.js',
      /* 每天3点，13点，21点的零五分定时重启 */
      // cron_restart: '0 5 3,13,21 * * *',
      watch,
      ...commonConfig,
    },
  ],
}

module.exports = pm2Config
