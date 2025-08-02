// import dotenv from "dotenv";
// dotenv.config();

export default class ConfigProvider {
  static get CONFIG() {
    return {
      APPLICATIONINSIGHTS_CONNECTION_STRING:
        "$APPLICATIONINSIGHTS_CONNECTION_STRING",
      API_URL: "$API_URL",
      API_UPLOAD: "$API_UPLOAD",
      DEFAULT_TIMEZONE: "Asia/Jakarta",
    };
  }

  static value(name:string) {
    // console.log('name',name);
    if (!(name in this.CONFIG)) {
      return;
    }

    const value = this.CONFIG[name as keyof typeof this.CONFIG];

    if (!value) {
      return;
    }

    if (typeof value === "string" && value.startsWith("$")) {
      // remove first character from value starts with $  (ex: $DEVCODE_API_URL) and get the value from process.env (ex: process.env.DEVCODE_API_URL)
      const envName = value.substr(1);
      const envValue =
        process.env[envName] || process.env["VUE_APP_" + envName];
      // console.log(envName, envValue);
      if (envValue) {
        return envValue;
      } else {
        return;
      }
    } else {
      return value;
    }
  }
}
