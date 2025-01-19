import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";
import {setLogLevel} from "@azure/logger";

if (process.env.DO_LOG) {
  setLogLevel("verbose");
}

if (!process.env.APP_CONFIG_ENDPOINT) {
  throw new Error("Missing environment variable APP_CONFIG_ENDPOINT");
}

const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(process.env.APP_CONFIG_ENDPOINT, credential);

const settings = client.listConfigurationSettings();

async function run() {
  for await (const setting of settings) {
    console.log(setting.key, setting.value);
  }
}

run().catch(console.error);
