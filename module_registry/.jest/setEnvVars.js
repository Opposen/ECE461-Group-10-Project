var dotenv = require('dotenv');
var path = require('path');

dotenv.config({ path: path.resolve(process.cwd().substring(0, process.cwd().lastIndexOf('/')), '.env') });

process.env.GITHUB_TOKEN;
process.env.LOG_LEVEL;
process.env.LOG_FILE;
