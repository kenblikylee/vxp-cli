import routes from "./src/routes";
import modules from "./src/modules";
import getters from "./src/getters";

export default {
  install({ addRoutes, addModules, addGetters }) {
    addRoutes(routes);
    addModules(modules);
    addGetters(getters);
  }
};
