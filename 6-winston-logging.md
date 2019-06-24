From: https://gist.github.com/Xeoncross/b8a735626559059353f21a000f7faa4b



```javascript
// logger.js

const { createLogger, format, transports } = require("winston");

// https://github.com/winstonjs/winston#logging
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const level = process.env.LOG_LEVEL || "debug";

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace("T", " ");

  return `${ts} ${level}: ${message} ${Object.keys(args).length
    ? JSON.stringify(args, "", "")
    : ""}`;
}

// https://github.com/winstonjs/winston/issues/1135
const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

let logger;

if (process.env.NODE_ENV !== "production") {
  logger = createLogger({
    level: level,
    format: developmentFormat,
    transports: [new transports.Console()]
  });

} else {
  logger = createLogger({
    level: level,
    format: productionFormat,
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combined.log" })
    ]
  });
}

module.exports = logger;
```



From: https://stackoverflow.com/questions/56090851/winston-logging-object

winston logger configuration:

```javascript
const winston = require('winston')
const { format, transports } = winston
const path = require('path')

const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat
      )
    }),
    new transports.File({
      filename: 'logs/combined.log',
      format: format.combine(
        // Render in one line in your log file.
        // If you use prettyPrint() here it will be really
        // difficult to exploit your logs files afterwards.
        format.json()
      )
    })
  ],
  exitOnError: false
})
```

Usage:

```javascript
const req = {
  body: {
    name: 'Daniel Duuch',
    email: 'daniel.duuch@greatmail.com',
    password: 'myGreatPassword'
  }
}

logger.debug(`Register ${req.body.name} with email ${req.body.email}`, { ...req.body, action: 'register' })
```

Console output:

```js
2019-05-11 17:05:45 debug [index.js]: Register Daniel Duuch with email daniel.duuch@greatmail.com
```

Logfile output (prettified by hand, see comment in the transport file format):

```js
{
  message: 'Register Daniel Duuch with email daniel.duuch@greatmail.com',
  level: 'debug',
  timestamp: '2019-05-11 17:05:45',
  label: 'index.js',
  metadata: {
    name: 'Daniel Duuch',
    email: 'daniel.duuch@greatmail.com',
    password: 'myGreatPassword'
  }
}
```

GraphQL logging middleware

From Ben Awad (on twitter): https://twitter.com/benawad97/status/1140270094725107715?s=12

![img](/Users/eddienaff/Private Folder/projects/web/portfolio-projects/instagram-clone/instagram-clone-client/docs/graphql-resolver-timing-middleware.png)

In our project:

```js
  app.use("/graphql", (req, res, next) => {
    const startHrTime = process.hrtime();

    res.on("finish", () => {
      if (req.body && req.body.operationName) {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs =
          elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        logger.info(`blab blah ${req.body.operationName} ${elapsedTimeInMs}`, {
          type: "timing",
          name: req.body.operationName,
          ms: elapsedTimeInMs
        });
      }
    });
    next();
  });

```

