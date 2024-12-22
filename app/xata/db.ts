import { XataClient } from "./xata";

export const db = new XataClient({
  apiKey: "xau_tZ6WEmZwfZH44uhxV5iqLBYHbZqCURZJ1",
  branch: "main",
  databaseURL:
    "https://King-cobra-s-workspace-eodsia.eu-west-1.xata.sh/db/softpayne",
}).db;
