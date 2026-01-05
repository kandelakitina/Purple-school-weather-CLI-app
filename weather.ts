import { getArgs } from "./helpers/args.ts";
import { printError, printHelp, printSuccess } from "./services/log.service.ts";
import { saveKeyValue } from "./services/storage.service.ts";

const saveToken = async (token: string) => {
  if (!token.length) {
    printError("Token cannot be blank");
    return;
  }
  try {
    await saveKeyValue("token", token);
    printSuccess("Token saved");
  } catch (error) {
    if (error instanceof Error) {
      printError(error.message);
    } else {
      printError(String(error));
    }
    return;
  }
};

const initCLI = () => {
  const { s: city, h: help, t: token } = getArgs(Deno.args);
  if (help) printHelp();
  if (token !== undefined) saveToken(token);
};

initCLI();
