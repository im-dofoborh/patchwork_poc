import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'

Vue.use(VueCodemirror, {
  options: {
    line: true,
    viewportMargin: Infinity,
  }
});
