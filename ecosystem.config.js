module.exports = {
    apps: [
        {
            name: "frontend",
            script: "npm",
            args: "run dev",
            cwd: "./",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
        {
            name: "backend",
            script: "node",
            args: "server/server.js",
            cwd: "./server",
            watch: true,
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
