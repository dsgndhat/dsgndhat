import PluginError from "plugin-error";
import log from "fancy-log";
import colors from "ansi-colors";
import prettifyTime from "./prettifyTime";
import handleErrors from "./handleErrors";

export default function(err, stats) {
  if (err) throw new PluginError("webpack", err);

  var statColor = stats.compilation.warnings.length < 1 ? "green" : "yellow";

  if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach(function(error) {
      handleErrors(error);
      statColor = "red";
    });
  } else {
    var compileTime = prettifyTime(stats.endTime - stats.startTime);
    log(colors[statColor](stats));
    log(
      "Compiled with",
      colors.cyan("webpack"),
      "in",
      colors.magenta(compileTime)
    );
  }
}
