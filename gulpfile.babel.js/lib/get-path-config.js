import projectPath from "./projectPath";
import fs from "fs";

function getPathConfig() {
  let pathConfig = require("../path-config.json");
  if (process.env.BLENDID_CONFIG_PATH) {
    pathConfig = require(projectPath(
      process.env.BLENDID_CONFIG_PATH,
      "path-config.json"
    ));
  }

  const defaultConfigPath = projectPath("config/path-config.json");

  if (fs.existsSync(defaultConfigPath)) {
    pathConfig = require(defaultConfigPath);
  }

  return pathConfig;
}

const pathConfig = getPathConfig();
export default pathConfig;
