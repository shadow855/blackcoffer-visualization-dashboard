const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');

const colors = require("colors");
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000", "https://blackcoffer-visualization-dashboard-oigr.onrender.com"]
}));


app.use('/api/data', require('./routes/jsonRoute'));

app.use(errorHandler);

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    })
} else {
    app.get('/', (req, res) => {
        res.send("API is running");
    });
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`.cyan.bold)
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();