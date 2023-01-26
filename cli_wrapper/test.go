package main

import (
    "log"
    "os/exec"
)

func main() {

    cmd := exec.Command("echo", "Hello World")

    err := cmd.Run()

    if err != nil {
        log.Fatal(err)
    }
}