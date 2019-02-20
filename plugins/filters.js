import Vue from 'vue'
import { titleCase, upperCase } from 'change-case';

/**
 * Convert to title case.
 */
Vue.filter('titleCase', titleCase);

/**
 * Convert to upper case.
 */
Vue.filter('upperCase', upperCase);
