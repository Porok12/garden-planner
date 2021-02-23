const app = require('./src/server');

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
