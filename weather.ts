import { getArgs } from "./helpers/args.ts";
import { printError, printHelp, printSuccess } from "./services/log.service.ts";

const initCLI = () => {
  const { s: city, h: help, t: token } = getArgs(Deno.args);
  console.log(city, help, token);
  if (help) printHelp();
};

initCLI();
