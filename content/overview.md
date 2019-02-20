# Overview

> Patchwork is the **Design System** for Fabric.


## The purpose

The objective of Patchwork is to build a library/reference that supports how we create components for Fabric - to be used by Developers, Designers, UX , QA and Product Owners.

All Fabric components should have been built so that they can be re-used, following Brad Frost's concepts of [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).  With ongoing use and additions, Patchwork will become the 'go to' space for every member of a team who is developing for or optimising for Fabric to find out:

1. The **RULES** and patterns surrounding themes, colours, fonts, and visual elements - [Visual Language](/language)
2. What **COMPONENTS** have been built and the usage rules of each component - [Component Library](/components)
3. The **FOUNDATIONS** of the platform, grid, and code - [Structural Foundations](/foundations)

## Why do this

> Manually updating a pattern library at every major release is error-prone and eventually leads to a growing gap between the website itself and the pattern library and, hence, to a decay in consistency. A pattern library has to be an integral part of the design and build process. Whenever a Grunt or Gulp task runs, it should ping the pattern library to prompt an update. Ideally, the pattern library would reference exactly the same HTML, CSS and JavaScript files that are used in the live environment, so that there is a one-to-one mapping between the components in the style guide and the ones used in production. In fact, the pattern library — the engine that provides the code snippets, usage hints, interface examples, and the tagging and organization of patterns — could be seen as a layer living on top of the production code, pulling code snippets and interface screens from it, rather than the other way around.
>
> *- [Smashing Magazine](https://www.smashingmagazine.com/taking-pattern-libraries-next-level/#qualities-of-a-lasting-pattern-library)*

## Maintaining Patchwork

Furthermore, our objective is that Patchwork will include some guidance on the **standards** and **criteria** that must be met, for a component or pattern to be added to the library... and how teams might need to do to put forth a new component for consideration.

-----
## [Visual Language](/language)

Our library of basic stylistic tools that aim to help us achieve visual consistency throughout Fabric. Covers brand theming, including colours, typography and iconography with Fabric defining the hierarchy and each site tailoring the styles to suit their brand.

With the exception of colour, visual language elements cannot change their hierarchy between sites but what that style is defined as may change to suit the brand. For example, “heading-1” will not change to a “heading-2” but a site may change the “heading-1” typeface and font-size site-wide.

-----
## [Component Library](/components)
Every element on the site is a component.   A series of interlinked and configurable components of various sizes create the various reusable elements on a site following Atomic Design principles:
- Atoms - e.g. Buttons
- Molecules - e.g. Breadcrumbs
- Organisms - e.g. Cards
- Templates - e.g. Article

Each component uses elements from the visual language and structural rules to achieve consistency.

-----
## [Structural Foundations](/foundations)

The foundations for how we lay out content and components. Incorporates the grid, Responsive behaviour, accessibility rules, spacing units, image aspect ratios and ad formats. Being so structural makes these far less likely to change between sites.
