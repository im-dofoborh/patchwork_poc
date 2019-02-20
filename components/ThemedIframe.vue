<template>
  <iframe
    ref="iframe"
    :srcdoc="srcdoc"
    :style="style"
    :class="classNames"
    scrolling="no"
    @load="onLoad" />
</template>

<script>
  export default {
    props: {
      theme: {
        type: Object,
        required: true,
      },
      markup: {
        type: String,
        default: '',
      },
      wrapInDocument: {
        type: Boolean,
        default: true
      },
      bodyClassNames: {
        type: String,
        default: '',
      },
      size: {
        type: String,
        default: '',
      }
    },

    data() {
      return {
        style: {
          height: 0,
        }
      }
    },

    computed: {
      srcdoc() {
        const { css, vendorJs, appJs, grunticon, webpackChunkManifest, dist, typekitId } = this.theme;

        if (!this.wrapInDocument) {
          return this.markup;
        }

        return `
          <!doctype>
          <html>
            <head>
              <link rel="stylesheet" type="text/css" href="${css}">
              <script>
                window.webpackManifest = ${webpackChunkManifest};
                window.chunkURL = '${dist}/'; // For dynamic cross-domain importing of chunks
              <\/script>
            </head>
            <body class="${this.bodyClassNames}" style="background-color: transparent;">
              ${this.markup}
              <script type="text/javascript" src="${vendorJs}"><\/script>
              <script type="text/javascript" src="${appJs}"><\/script>
              <script type="text/javascript" src="${grunticon.loader}"><\/script>
              <script>
                window.onload = function () {
                  grunticon(
                    ${JSON.stringify(grunticon.stylesheets)},
                    grunticon.svgLoadedCORSCallback
                  );
                };
              <\/script>
              <script>
                (function(d) {
                  var config = {
                    kitId: '${typekitId}',
                    scriptTimeout: 3000,
                    async: true
                  },
                  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
                })(document);
              <\/script>
            </body>
          </html>
        `;
      },

      classNames() {
        let classNames = 'sg-themed-iframe';
        if (this.size) {
          classNames += ` sg-themed-iframe--${this.size.toLowerCase()}`;
        }
        return classNames;
      }
    },

    methods: {
      /**
       * Handle the iframe load event.
       */
      onLoad() {
        if (!('MutationObserver' in window)) {
          this.setHeightAtIntervals(400);
          return;
        }
        this.setHeight();
        this.setHeightOnMutation();
        this.$emit('load');
      },

      /**
       * Set the iframe height at given intervals.
       * @param {number} interval
       *   An interval in milliseconds.
       * @param {number} clearAfter
       *   Milliseconds after which to stop calling.
       */
      setHeightAtIntervals(interval, clearAfter) {
        setInterval(this.setHeight, interval);
        if (clearAfter) {
          setInterval(this.setHeight, interval);
          setTimeout(() => {
            clearInterval(this.setHeight);
          }, clearAfter);
        }
      },

      /**
       * Set iframe height when mutation observed.
       */
      setHeightOnMutation() {
        const { iframe } = this.$refs;
        if (!iframe) {
          return;
        }
        const config = {
          attributes: true,
          childList: true,
          subtree: true,
        };
        const observer = new MutationObserver(() => {
          // Update height for 5 seconds to allow for any animations
          this.setHeightAtIntervals(24, 5000);
        });
        observer.observe(iframe.contentWindow.document.body, config);
      },

      /**
       * Set the height of the iframe.
       */
      setHeight() {
        const { iframe } = this.$refs;
        if (!iframe) {
          return;
        }
        const height = this.getHeightOfTallestChild(iframe.contentWindow.document.body);
        this.style.height = `${height}px`;
      },

      /**
       * Get the height of the tallest child inside a root element.
       * @param {Element} root
       *   The root element.
       * @returns {number}
       *  The pixel height of the tallest child.
       */
      getHeightOfTallestChild(root) {
        let maxHeight = -1;
        this.forAllVisibleChildNodes(root, (element, computedStyle) => {
          const boundingRect = element.getBoundingClientRect();
          maxHeight = Math.max(maxHeight, boundingRect.top
            + boundingRect.height
            + Math.abs(parseFloat(computedStyle.marginBottom))
            + this.getShadowHeight(computedStyle)
          );
        });
        return maxHeight;
      },

      /**
       * Get the height of any box shadows.
       * @param {object} computedStyle
       *   The CSS properties of an element.
       * @returns {number}
       *   The pixel height of any shadows.
       */
      getShadowHeight(computedStyle) {
        if (computedStyle.boxShadow !== 'none') {
          const shadowChunks = computedStyle.boxShadow.split('px ');
          return Math.abs(parseFloat(shadowChunks[1])) // height
            + Math.max(0, parseFloat(shadowChunks[2])) // shadow blur
            + Math.max(0, parseFloat(shadowChunks[3])); // shadow spread
        }
        return 0;
      },

      /**
       * Exacute a callback function for all visible child nodes.
       * @param {Element} node
       *   A root node.
       * @param {Function} cb
       *   A callback function.
       */
      forAllVisibleChildNodes(node, cb) {
        if (node && node.nodeType === 1) {
          const computedStyle = window.getComputedStyle(node);
          cb(node, computedStyle);
          if (computedStyle.getPropertyValue('overflow') === 'visible') {
            for (const child of node.childNodes) {
              this.forAllVisibleChildNodes(child, cb);
            }
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sg-themed-iframe {
    display: block;
    border: 0;
    height: 0;
    transition: width .3s ease;
    width: 100%;
    max-width: 100%;

    &--xs {
      width: map-get($grid-breakpoints, sm) - 1;
    }

    &--sm {
      width: map-get($grid-breakpoints, md) - 1;
    }

    &--md {
      width: map-get($grid-breakpoints, lg) - 1;
    }
  }
</style>