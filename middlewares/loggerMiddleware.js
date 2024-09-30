const logger = require("../services/loggerServices");
const fs = require("fs");
const path = require("path");

const ensureLogDirectoryExists = (logDirectory) => {
    if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
    }
};

const loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    const originalSend = res.send.bind(res);
    const date = new Date().toISOString().split("T")[0];
    const logDirectory = path.join(__dirname, "../logs");
    const logFilePath = path.join(logDirectory, `${date}-requests.log`);

ensureLogDirectoryExists(logDirectory);

    const logRequest = `Request: ${req.method} ${req.url}\nBody: ${JSON.stringify(
    req.body
    )}\n`;
    fs.appendFileSync(logFilePath, logRequest);

    res.send = (body) => {
    const duration = Date.now() - start;
    const logResponse = `Response: ${res.statusCode}\nDuration: ${duration}ms\nBody: ${body}\n\n`;
    fs.appendFileSync(logFilePath, logResponse);

    logger.info({
    request: { url: req.url, method: req.method, body: req.body },
    response: { status: res.statusCode, body },
    duration: `${duration}ms`,
    });

    return originalSend(body);
};

    next();
};

const errorHandlingMiddleware = (err, req, res, next) => {
    const date = new Date().toISOString().split("T")[0];
    const logDirectory = path.join(__dirname, "../logs");
    const errorLogFilePath = path.join(logDirectory, `${date}-errors.log`);

    ensureLogDirectoryExists(logDirectory);

    const errorLog = `Error: ${err.message}\nStack: ${err.stack}\n\n`;
    fs.appendFileSync(errorLogFilePath, errorLog);

    logger.error(`Error: ${err.message}`, { stack: err.stack });

    res.status(500).json({ status: "error", message: err.message });
};

module.exports = { loggerMiddleware, errorHandlingMiddleware };
