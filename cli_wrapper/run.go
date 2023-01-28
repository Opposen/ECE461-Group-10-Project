package main

import (
	"log"
	"os"
	"os/exec"
)

// ! This file should generate an executable in the root directory of the project called "run"
// to generate the executable run "go build ./run.go && mv ./run .." in this directory

/*
generic function for executing commands
*/
func execute(cmd *exec.Cmd) {
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
}

/*
./run install
- Installs ay dependencies in userland
- Should exit 0 if successful
*/
func install() {
	log.Println("Installing dependencies in userland...")
	// execute npm install from within the "package_metrics_cli" directory
	os.Chdir("package_metrics_cli")
	cmd := exec.Command("npm", "install")
	execute(cmd)
}

/*
./run build
- Compiles the node/TS cli
- Should exit 0 if successful
*/
func build() {
	log.Println("Building CLI")
	// execute npm run build from within the "package_metrics_cli" directory
	os.Chdir("package_metrics_cli")
	cmd := exec.Command("npm", "run", "build")
	execute(cmd)

	// maybe: move the built cli to the root directory of the project
}

/*
./run URL_FILE
- Runs the CLI with the URL_FILE being the path to the file containing the URLs
- Should exit 0 if successful
- Should print all CLI output to stdout
*/
func run() {
	log.Println("Running CLI")
	// execute the cli with the URL_FILE as the argument
	cmd := exec.Command("node", "package_metrics_cli/out/index.js", "-f", os.Args[1])
	execute(cmd)
}

func main() {

	if len(os.Args) < 2 {
		log.Fatal("Please provide a command")
	}

	switch os.Args[1] {
	case "install":
		install()
	case "build":
		build()
	default:
		// check if the argument is a file
		if _, err := os.Stat(os.Args[1]); err == nil {
			run()
		} else {
			log.Fatal("Please provide a valid command")
		}
	}
}
