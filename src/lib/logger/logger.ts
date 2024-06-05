/* eslint no-underscore-dangle: 0 */
type LogPayload = any;
type LogEntry = {
    timestamp: string;
    url: string;
    name: string;
    payload: LogPayload;
};

const LOGGER_BATCH_INTERVAL = 3 * 1000;

class Logger {
    _buffer: LogEntry[] = [];

    _sendEvents?: (logs: LogEntry[]) => void;

    initialize(sendEvents: (logs: LogEntry[]) => void) {
        this._sendEvents = sendEvents;
        const interval = setInterval(this._flushLogs.bind(this), LOGGER_BATCH_INTERVAL);
        return () => clearInterval(interval);
    }

    log(name: string, payload: LogPayload) {
        this._buffer.push({
            timestamp: new Date().toISOString(),
            name,
            url: window.location.href,
            payload: payload,
        });
    }

    _flushLogs() {
        if (this._buffer.length === 0) return;

        this._sendEvents?.(this._buffer);
        this._buffer = [];
    }
}

const logger = new Logger();

export const loggedFetch: typeof fetch = (...args) => {
    // Both backendApi and onboardingApi will always call fetch with URL as the first parameters
    // This is a no-op but TypeScript forces us to do it
    const url = `${args[0]}`;

    return fetch(...args)
        .then((result) => {
            logger.log('HTTP', {url, status: result.status});
            return result;
        })
        .catch((error) => {
            logger.log('HTTP', {url, error: error?.message});
            throw error;
        });
};

export default logger;
