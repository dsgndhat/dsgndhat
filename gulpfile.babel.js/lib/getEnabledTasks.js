import TASK_CONFIG from "./get-task-config";
import PATH_CONFIG from "./get-path-config";
import stylesheets from "../tasks/stylesheets";

// Grouped by what can run in parallel
var assetTasks = ["fonts", "iconFont", "images", "svgSprite"];
var codeTasks = ["html", "stylesheets", "javascripts"];

export default function(env) {
  function matchFilter(task) {
    if (TASK_CONFIG[task]) {
      if (task === "javascripts") {
        task = env === "production" ? "webpack:production" : false;
      }
      return task;
    }
  }

  function exists(value) {
    return !!value;
  }

  function findExistingTasks(candidates) {
    var tasks = candidates.map(matchFilter).filter(exists).filter(v => v)

    return tasks.length ? tasks : false;
  }

  return {
    assetTasks: findExistingTasks(assetTasks),
    codeTasks: findExistingTasks(codeTasks)
  };
}
