# Patchwork

> Fabric styleguide for all brands.

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000 (uses local)
$ yarn run dev

# build for production and launch server (uses release)
$ yarn run build
$ yarn start

# generate static project (uses release)
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Hot reloading from custom folders

As well as hot reloading when any changes are made to this repository, during
local development it can be useful to watch for any changes to the Twig
templates and styles currently in wcp-core. This can be  achieved by passing a
relative path or glob pattern to `--watch`, for example:

```
npm run dev --watch="../relative/path/to/wcp-core"
```

## Analyzing bundles

Use [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
to visualize bundles and help determine to optimize them by running:

```bash
npm run build --analyze
```

## Generating sourcemaps

Sourcemaps are usually only generated for local development; to generate them
in production mode run:

```bash
npm run build --sourcemaps
```

## Enabling a site

To enable Patchwork for a site visit the Fabric instance for the domain
configured in [local settings](./local-settings.tmpl.js) and activate
the [im-styleguide](https://github.immediate.co.uk/WCP/im-styleguide) plugin.

The name given for the site will be taken from the WordPress admin setting
at **General Settings > Site Title**.
