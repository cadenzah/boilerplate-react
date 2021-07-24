const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// List of npm script environment variable
// property value is a default value for that variable
const NPM_SCRIPT_ENV = {
    MODE: 'development',
};

function addNPMVars(envFile, processEnv) {
    const addedEnv = Object.assign({}, envFile);
    for (let key in NPM_SCRIPT_ENV) {
        // If same name of variable exists in .env file,
        // the variable from NPM will be ignored
        if (addedEnv[key] !== undefined) {
            return;
        }

        addedEnv[key] = processEnv[key] || NPM_SCRIPT_ENV[key];
    }
    return addedEnv;
}

// Util function that processes and generates environment variables
// The returned object will be used in `webpack.DefinePlugin`
module.exports = (env) => {
    // Get the root path (based on where `/config/env/index.js` is located)
    const currentPath = path.join(__dirname);

    // Create the fallback path
    // MAKE SURE YOU PUT `.env` file along this .js file
    const basePath = currentPath + '/.env';

    // Concatenate the environment name to our filename to get correct env file
    // Default production env file : .env
    // Other exmaple for development  : .env.development
    const envPath = `${basePath}.${env.MODE}`;

    // Check if the .env file exist, otherwise get the .env file (FALLBACK)
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    // also, add from npm script environment variable
    let envFile = dotenv.config({ path: finalPath }).parsed;
    envFile = addNPMVars(envFile, process.env);

    if (envFile === undefined || envFile === null) {
    // .env is not defined; prompt warning message
        console.log("\x1b[34mℹ", "\x1b[33m\`.env\`\x1b[0m", "is not defined or not located in", "\x1b[33m\`/config/env\`\x1b[0m", "directory. If it's not intended, better fix it.\n");

        return {
            stringified: {
                'process.env.__NOT_USED__': JSON.stringify(undefined),
            },
            raw: {
                __NOT_USED__: undefined,
            },
        };
    }

    if (Object.keys(envFile).length < 1) {
    // .env is empty
        console.log("\x1b[34mℹ", "\x1b[33m\`.env\`\x1b[0m", "file's content is", "\x1b[33mempty\x1b[0m.", "If it's not intended, better fix it.\n");
    }

    // reduce it to a nice object
    const envKeys = Object
        .keys(envFile)
        .reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(envFile[next]);
            return prev;
        }, {});

    return {
        stringified: envKeys,
        raw: envFile,
    };
};
