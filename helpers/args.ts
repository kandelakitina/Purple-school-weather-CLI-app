import { parseArgs } from "@std/cli/parse-args";

const getArgs = (args: string[]) => {
  return parseArgs(args, {
    string: ["s", "l"],
    boolean: ["h"],
  });
};

export { getArgs };
