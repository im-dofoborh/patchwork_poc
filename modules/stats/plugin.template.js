/**
 * Stats plugin.
 */
class Stats {
  /**
   * Instantiate.
   * @param {object} ctx
   *   The Nuxt context.
   */
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * Get stats for all components.
   * @returns {object}
   *   The stats.
   */
  getComponentStats() {
    const components = Object.values(this.ctx.app.store.state.components);
    return {
      ...this.getCoreComponentStats(components),
      ...this.getTagStats(components)
    }
  }

  /**
   * Get basic component stats such as atomicity and variant counts.
   * @param {array} components
   *   The components.
   * @returns {object}
   *   The component stats.
   */
  getCoreComponentStats(components) {
    components = components || {};
    const stats = {
      componentCount: components.length,
      atomCount: 0,
      moleculeCount: 0,
      organismCount: 0,
      templateCount: 0,
      todoCount: 0,
      variantCount: 0,
    }
    components.forEach((component) => {
      stats[`${component.metadata.atomicity}Count`] += 1;

      if (component.variants) {
        stats.variantCount += Object.keys(component.variants).length;
      }
    });
    return stats;
  }

  /**
   * Get stats for all component tags.
   * @param {array} components
   *   The components.
   * @returns {object}
   *   The tag stats.
   */
  getTagStats(components) {
    components = components || {};
    const tags = [].concat(...components.map(component => {
      return component.metadata.tags || []
    }));
    const tagCounts = tags.reduce((obj, tag) => {
      obj[tag] = obj[tag] || 0;
      obj[tag] += 1;
      return obj;
    }, {});
    const sortedTags = this.sortTags(tagCounts);

    return {
      tagCounts: tagCounts,
      mostUsedTags: this.tagArrayToObject(sortedTags.slice(-5)),
      leastUsedTags: this.tagArrayToObject(sortedTags.slice(0, 5)),
    }
  }

  /**
   * Sort tag counts in ascending order.
   * @param {object} tagCounts
   *   The tag-count pairs.
   * @returns {array}
   *   The sorted tags where each item comprises the tag then the count.
   */
  sortTags(tagCounts) {
    const tagArray = Object.keys(tagCounts).map(tag => [tag, tagCounts[tag]]);
    tagArray.sort((a, b) => a[1] - b[1]);
    return tagArray;
  }

  /**
   * Convert an array of tag counts to an object.
   * @param {array} tagsArray
   *   A list of tags where each item comprises the tag then the count.
   * @returns {object}
   *   The tag-count pairs.
   */
  tagArrayToObject(tagsArray) {
    return tagsArray.reduce((obj, item) => {
      obj[item[0]] = item[1]
      return obj;
    }, {});
  }
}

/**
 * Instatiate and inject the Stats helper as $stats.
 */
export default (ctx, inject) => {
  const stats = new Stats(ctx);
  ctx.$stats = stats;
  inject('stats', stats);
}