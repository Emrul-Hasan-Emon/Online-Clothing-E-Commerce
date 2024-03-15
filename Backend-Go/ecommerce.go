package main

import "github.com/Emrul-Hasan-Emon/repositories/ecommerce/config"

func main() {
	config := config.NewConfig()
	defer config.CloseLog()
}
