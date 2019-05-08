const rewireAliases = require("react-app-rewire-aliases");
const { paths } = require("react-app-rewired");
const path = require("path");

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    "styled-components": path.resolve(
      `${paths.appSrc}/../node_modules/styled-components`
    )
  })(config, env);
  return config;
};
