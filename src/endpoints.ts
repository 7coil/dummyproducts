import { Environment } from "./types/env";
import apis from "./config.json";

const getEndpoints = () => {
  const env: Environment = process.env.NODE_ENV as Environment;
  return apis[env];
};

export { getEndpoints };
