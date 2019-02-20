import axios from 'axios';
import { titleCase } from 'change-case';
import localSettings from '~/local-settings';

/**
 * Fabric client plugin.
 */
class Fabric {
  /**
   * Instantiate.
   * @param {object} ctx
   *   The Nuxt context.
   */
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * Get the base API URL for a theme.
   * @param {string} key
   *   A site key.
   * @returns {string}
   *   The root API endpoint.
   */
  getApiBaseUrl(key) {
    const { domain } = this.ctx.env;
    const { styleguideApi } = localSettings;
    return `https://${key}.${domain}/${styleguideApi}`;
  }

  /**
   * Make a request to the Fabric styleguide API.
   * @param {string} endpoint
   *   An API endpoint.
   * @param {string} [key]
   *   A site key.
   * @returns {object}
   *   The axios response.
   */
  get(endpoint, key) {
    if (!key) {
      key = this.ctx.store.state.currentSite.key || localSettings.baseSite;
    }
    const url = `${this.getApiBaseUrl(key)}${endpoint}`;
    return axios.get(url);
  }

  /**
   * Add the component's route.
   * @param {object} component
   *   A component.
   * @returns {object}
   *   The component with the route added.
   */
  addRouteToComponent(component) {
    const { family, id } = component.metadata;
    component.route = `/components/${family}/${id}`.toLowerCase();
    return component;
  }

  /**
   * Add dev links to a component.
   * @param {object} component
   *   A component.
   * @returns {object}
   *   The component with the route added.
   */
  addDevLinksToComponent(component) {
    const { yamlLocation, readmeHtml } = component.metadata;
    const readmeLocation = yamlLocation.replace(/\/([^\/]+)\/?$/, '/README.md');
    const hasReadme = readmeHtml.length;
    component.devLinks = {
      yaml: this.getDevLink(yamlLocation),
      readme: this.getDevLink(readmeLocation, hasReadme),
    }
    return component;
  }

  /**
   * Get a GitHub dev link.
   * @param {string} path
   *  The path to the file in the styleguide plugin GitHub repository.
   * @param {boolean} [isNew]
   *  True if the file exists, false otherwise.
   * @returns {string}
   *   The GitHub edit or create link.
   */
  getDevLink(path, isNew = true) {
    const { baseUrl } = localSettings.github;
    const { owner, name, branch } = localSettings.github.repos.styleguide;
    const filename = path.split('/').slice(-1);
    const modifiedPath = isNew
      ? path
      : path.replace(/\/([^\/]+)\/?$/, `/new?filename=${filename}`);
    const action = isNew
      ? 'edit'
      : 'new';
    return `${baseUrl}/${owner}/${name}/${action}/${branch}/${modifiedPath}`;
  }

  /**
   * Get sites with the im-styleguide plugin active.
   */
  async getSites() {
    const { baseSite } = localSettings;
    return await this.get('/sites', baseSite);
  }

  /**
   * Get a theme.
   * @param {string} name
   *   A site key.
   * @returns {object}
   *   The axios response.
   */
  async getTheme(key) {
    return await this.get('/theme', key);
  }

  /**
   * Get the data for all components.
   * @returns {object}
   *   The axios response.
   */
  async getComponents() {
    const res = await this.get('/components');
    if (res.data) {
      res.data = res.data.map((component) => {
        component = this.addRouteToComponent(component);
        component = this.addDevLinksToComponent(component);
        return component;
      });
    }
    return res;
  }

  /**
   * Get the data for a single component.
   * @param {string} key
   *   The component ID.
   * @returns {object}
   *   The axios response.
   */
  async getComponent(key) {
    const res = await this.get(`/components/component/${key}`);
    if (res.data) {
      res.data = this.addRouteToComponent(res.data);
      res.data = this.addDevLinksToComponent(res.data);
    }
    return res;
  }

  /**
   * Get basic data for all components; just enough info for the menu.
   * @returns {object}
   *   The axios response.
   */
  async getBasicComponents() {
    const res = await this.get(`/components/paths`);
    // Firefox couldn't cope with /(?<=im-styleguide-).*(?=\.twig$)/
    const prefixPattern = /^im-styleguide-/;
    const suffixPattern = /\.twig$/;

    if (res.data) {
      res.data = res.data.map((componentPath) => {
        const parts = componentPath.split('/');
        const id = parts[parts.length - 1].replace(prefixPattern, '').replace(suffixPattern, '');
        return {
          metadata: {
            id,
            name: titleCase(id),
            family: titleCase(parts[parts.length - 3]),
          }
        }
      });
      res.data = res.data.map(this.addRouteToComponent);
    }

    return res;
  }

  /**
   * Get the theme's colour settings.
   * @returns {object}
   *   The axios response.
   */
  async getColours() {
    return await this.get('/language/colours');
  }

  /**
   * Get the theme's editor content settings.
   * @returns {object}
   *   The axios response.
   */
  async getEditorContent() {
    return await this.get('/language/editor');
  }

  /**
   * Get the theme's font settings.
   * @returns {object}
   *   The axios response.
   */
  async getFonts() {
    return await this.get('/language/fonts');
  }

  /**
   * Get the theme's icon settings.
   * @returns {object}
   *   The axios response.
   */
  async getIcons() {
    return await this.get('/language/icons');
  }

  /**
   * Get the theme's typogrpahy settings.
   * @returns {object}
   *   The axios response.
   */
  async getTypography() {
    return await this.get('/language/typography');
  }
}

/**
 * Instatiate and inject the Fabric helper as $fabric.
 */
export default (ctx, inject) => {
  const fabric = new Fabric(ctx);
  ctx.$fabric = fabric;
  inject('fabric', fabric);
}