const createApp = require('./src/server');
const db = require("./src/models");

db.connect(() => {
    const app = createApp();

    const PORT = process.env.PORT || 8081;

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at https://localhost:${PORT}`);
    });
});
