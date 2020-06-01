const path = require('path');
const fs = require('fs');
const pino = require('pino');

/**
 * @param {string} project
 * @param {string} [appName]
 */
function createLogger(project, appName) {
    const logPath = getLogPath(project, appName);
    const logDir = path.dirname(logPath);
    const pidFile = path.join(logDir, path.basename(logPath, '.log') + '.pid');

    fs.mkdirSync(logDir, { recursive: true });
    fs.writeFileSync(pidFile, process.pid);

    const dest = pino.destination(logPath);

    const logger = pino({
        name: project,
        formatters: {
            level(label, _number) {
                return { level: label };
            }
        },
        timestamp: pino.stdTimeFunctions.isoTime
    }, dest);

    process.on('SIGHUP', () => dest.reopen());
    process.on('exit', () => fs.unlinkSync(pidFile));

    if (appName) {
        return logger.child({
            'app-name': appName
        });
    }

    return logger;
}

module.exports = createLogger;

/**
 * @param {string} projectName
 * @param {string} [appName]
 */
function getLogPath(projectName, appName) {
    const normalize = s => s.toLowerCase().replace(' ', '-');
    const PATH = process.env.LOG_PATH || '/var/log/';

    const normalizedProjectName = normalize(projectName);
    const fileName = appName ? normalize(appName) : normalizedProjectName;
    return path.join(PATH, normalizedProjectName, fileName + '.log');
}
