package config

import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"os"
	"strings"

	log "github.com/Emrul-Hasan-Emon/repositories/ecommerce/log4u"
)

const (
	defaultConfigFilePath = "ecommerce.json"
	defaultLogLevel       = "DEBUG"
)

type ServerDef struct {
	Bind string
	Port int
}

type DbDef struct {
	User         string
	Password     string
	Host         string
	DatabaseName string
}

type LogDef struct {
	Filename string
	Level    string
}

type configData struct {
	Name        string
	Description string
	AllowCORS   bool
	Db          DbDef
	Server      ServerDef
	Logging     LogDef
	Indent      bool
}

type Config struct {
	configData *configData
	logFile    *os.File
	logDebug   bool
	appName    string
}

func NewConfig() *Config {
	configData := loadConfig()
	logFile := configureLogging(configData.Logging.Filename, configData.Logging.Level)
	logDebug := configData.Logging.isDebug()
	appName := configData.GetappName()

	return &Config{configData, logFile, logDebug, appName}
}

func loadConfig() *configData {
	flag.Parse()
	configFilePath := flag.Arg(0)
	if configFilePath == "" {
		configFilePath = defaultConfigFilePath
	}
	log.Infof("Reading configuration from %s\n", configFilePath)
	data, err := os.ReadFile(configFilePath)
	if err != nil {
		log.Fatalf("Failed to read file %s: %v", configFilePath, err)
	}
	var cfgData configData
	if err := json.Unmarshal(data, &cfgData); err != nil {
		log.Fatalf("Failed to unmarshal from file %s: %v", configFilePath, err)
	}
	fmt.Println("Config Data: ", cfgData)
	return &cfgData
}

func configureLogging(filename, level string) *os.File {
	var logFile *os.File
	var err error

	if filename == "" {
		log.SetLevel(defaultLogLevel)
	} else {
		logFile, err = os.Create(filename)
		if err != nil {
			log.Fatalf("Failed to create file %s: %v", filename, err)
		}
		logger := io.MultiWriter(os.Stderr, logFile)
		log.SetLevel(level)
		log.SetOutput(logger)
	}
	return logFile
}

func (c *Config) GetDatabaseDef() *DbDef {
	return &c.configData.Db
}

func (c *Config) GetAllowCORS() bool {
	return c.configData.AllowCORS
}

func (c *Config) GetServer() *ServerDef {
	return &c.configData.Server
}

func (ld *LogDef) isDebug() bool {
	return strings.EqualFold(ld.Level, "DEBUG")
}

func (cd *configData) GetappName() string {
	return fmt.Sprintf("%s/%s", cd.Name, "1.0.0")
}

func (c *Config) CloseLog() {
	if c.logFile != nil {
		c.logFile.Close()
	}
}

func (c *Config) GetIndent() bool {
	return c.configData.Indent
}
