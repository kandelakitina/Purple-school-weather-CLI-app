import { parseArgs } from "@std/cli/parse-args";

const getArgs = (args: string[]) => {
  return parseArgs(args, {
    string: ["s", "t"],
    boolean: ["h"],
  });
};

export { getArgs };
