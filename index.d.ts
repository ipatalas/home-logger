import P from 'pino';

declare function createLogger(project: string, appName?:string): P.Logger;

export = createLogger;