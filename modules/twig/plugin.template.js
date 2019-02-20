
import { TwingEnvironment, TwingLoaderArray } from 'twing';
import uuid from 'uuid/v4';

/**
 * Twig plugin.
 */
class Twig {
  constructor(ctx) {
    this.ctx = ctx;
    this.twing = null;
    this.customSnippetPath = 'patchwork-custom-snippet.twig'
  }

  /**
   * Render a Twig snippet.
   * @param {string} snippet
   *   A Twig snippet.
   * @returns {string}
   *   The rendered snippet.
   */
  render(snippet) {
    if (!this.twing) {
      this.loadEnvironment();
    }
    this.twing.loader.setTemplate(this.customSnippetPath, snippet);
    return this.twing.render(this.customSnippetPath);
  }

  /**
   * Load the stored components into the Twig environment.
   *
   * Currently won't work when the site is statically genreated as Twing calls
   * constructor.name when adding extensions and each name must be unique, and
   * for some strange reason constructor.name always returns an empty string
   * when the site is statically generated.
   */
  loadEnvironment() {
    const { components, componentsLoaded } = this.ctx.store.state;
    if (!componentsLoaded) {
      throw new Error('The components have not been loaded yet');
    }

    const twigArray = this.getTwigArray(components);
    const loader = new TwingLoaderArray(twigArray);
    this.twing = new TwingEnvironment(loader);
  }

  /**
   * Get the twig array.
   * @param {array} components
   *   The components.
   * @returns {string}
   *   The content for the TwingLoaderArray.
   */
  getTwigArray(components) {
    return Object.values(components).filter((component) => {
      return component.templatePath;
    }).reduce((obj, component) => {
      // Enable imports with or without leading slash
      obj[component.templatePath] = component.realTemplate;
      obj[component.templatePath.replace(/^\//, '')] = component.realTemplate;
      return obj;
    }, {});
  }
}

/**
 * Instatiate and inject the Twig helper as $twig.
 */
export default (ctx, inject) => {
  const twig = new Twig(ctx);
  ctx.$twig = twig;
  inject('twig', twig);
}