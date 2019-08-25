import gulp from "gulp";
import fs from "fs-extra";
import del from "del";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";

var replaceFiles = function(cb) {
  var temp = projectPath(PATH_CONFIG.dest);
  var dest = projectPath(PATH_CONFIG.finalDest);
  var delPatterns =
    TASK_CONFIG.clean && TASK_CONFIG.clean.patterns
      ? TASK_CONFIG.clean.patterns
      : dest;

  del.sync(delPatterns, { force: true });
  fs.copySync(temp, dest);
  del.sync(temp, { force: true });

  cb();
};

export default replaceFiles;
