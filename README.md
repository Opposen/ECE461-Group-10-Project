# Authors
Aneesh Iyer  
Logan Stapleton  
Daniyaal Rasheed  
Liam E Roach 

Robert Sego

Ryan Marchand

# to get the cli up-and-running:
0. there should be an executable `run` in the root directory, if not (or the compiled executable is incompatable with your os) navigate to `/cli_wrapper` and run `make` in the terminal to generate a new executable in the root directory
1. `./run install` installs dependencies as long as you have the ability to execute go
2. `./run build` complies the cli
3. `./run URL_FILE` will run the cli with an ascii delimited file containing ULRs to npm modules 

# Env file
A `.env` file specifying logging details and github authentication token should be added to the root directory of the repo
### Example `.env` file
```
GITHUB_TOKEN=ghp_nqp7EaHtK5SKzj5WEA2hRbsq6zeejjnnfuHwR
LOG_LEVEL=1
LOG_FILE=/Users/myUser/IdeaProjects/files
```
Each user will need to replace the GITHUB_TOKEN value with their own authentication token

# Testing
A `setEnvVars.js` file specifying logging details and github authentication should be addedd under the `module_registry/.jest` directory
### Example setEnvVars.js
```
process.env.LOG_FILE = 'testlog'
process.env.GITHUB_TOKEN = 'ghp_nqp7EaHtK5SKzj5WEA2hRbsq6zeejjnnfuHwR'
```
Before running tests, add you github token as a string to the `module_registry/.jest/setEnvVars.js`

