/**
 * Dispatch nuxtClientInit action.
 */
export default async (ctx) => {
  if (process.browser) {
    try {
      await ctx.store.dispatch('nuxtClientInit', ctx);
    } catch (err) {
      ctx.error(err);
    }
  }
}
