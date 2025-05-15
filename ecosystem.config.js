module.exports = {
  apps: [
    {
      name: "relative-time",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4000",
      cwd: "./", // Set this to the absolute path on your server
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
};
