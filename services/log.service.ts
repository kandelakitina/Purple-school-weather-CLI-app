import { cyan, green, red } from "@std/fmt/colors";

const printError = (error: string) => {
  console.log(red(`Error received: ${error}`));
};

const printSuccess = (message: string) => {
  console.log(green(`Message received: ${message}`));
};

const printHelp = () => {
  console.log(
    `${cyan("Help")}
    No params - shows weather
    -s [city] Sets city
    -h Shows help
    -t [API_KEY] Sets open-weather API key
    `,
  );
};

export { printError, printHelp, printSuccess };
