import fs from "fs";
import projectPath from "./projectPath";
import taskDefaults from "./task-defaults";
import mergeWith from "lodash.mergewith";

function getTaskConfig() {
  if (process.env.BLENDID_CONFIG_PATH) {
    return require(projectPath(
      process.env.BLENDID_CONFIG_PATH,
      "task-config.js"
    ));
  }

  const defaultConfigPath = projectPath("config/task-config.js");

  if (fs.existsSync(defaultConfigPath)) {
    return require(defaultConfigPath);
  }

  return require("../task-config");
}

function withDefaults(taskConfig) {
  const oTask = taskConfig.default;
  Object.keys(taskDefaults).reduce((config, key) => {
    if (oTask[key] !== false) {
      // if true, use default, else merge objects
      config[key] =
        taskDefaults[key] === true
          ? taskDefaults[key]
          : mergeWith(taskDefaults[key], config[key] || {}, replaceArrays);
    }
    return config;
  }, oTask);
  return oTask;
}

function replaceArrays(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
}

const taskConfig = withDefaults(getTaskConfig());

export default taskConfig;
