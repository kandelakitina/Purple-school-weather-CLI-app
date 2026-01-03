import { getArgs } from "./helpers/args.ts";

const initCLI = () => {
  const args = getArgs(Deno.args);
  console.log(args);
};

initCLI();
