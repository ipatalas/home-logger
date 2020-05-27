# Home-logger

I do have [couple](http://github.com/ipatalas/home) of *scripts* at home which all need to log to Elasticsearch.

To make it easier that simple *library* was born. It's just a simple wrapper over `pino` package.
It simply writes structured logs to files. That's mainly to remove all boilerplate around logging and leave just pure logic:

```JS
const log = require('home-logger')('system-name', 'sub-system-name' /* optional */);

log.info('Test log entry');
```

That will by default log to `/var/log/<system-name>/<sub-system-name>.log`. System name and subsystem name will be normalized: all lowercase and spaced replaced with dash.

Log rotation is out of this library responsibility. One can use [logrotate](https://getpino.io/#/docs/help?id=rotate) for that.

## Installation

```sh
# latest version
$ npm install github:ipatalas/elastic-logger
# specific version
$ npm install github:ipatalas/elastic-logger#v1.1
```

List of all versions: https://github.com/ipatalas/home-logger/releases

## Configuration

Environment variables:

**LOG_PATH** - path to logs (default: */var/log*)

## Filebeats configuration

Work in progress