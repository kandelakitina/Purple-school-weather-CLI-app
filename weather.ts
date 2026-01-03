import { getArgs } from "./helpers/args.ts";

const initCLI = () => {
  const { s: city, h: help, t: token } = getArgs(Deno.args);
  console.log(city, help, token);
};

initCLI();
