var dotenv = require('dotenv');
var path = require('path');

console.log(`============ env-setup Loaded ===========`);
dotenv.config({ path: path.resolve(process.cwd(), 'tests', 'settings', '/Users/robertsego/Documents/ECE461-Group-4-part-2/.env') });

process.env.GITHUB_TOKEN;
process.env.LOG_LEVEL;
process.env.LOG_FILE;
