import Vue from 'vue';
import Icon from './Icon.vue';
import Color from './Color.vue';

export { default as Icon } from './Icon.vue';
export { default as Color } from './Color.vue';

Vue.JSONSimpleEditor = {
  components: { Icon, Color },
};
console.log(Vue?.JSONSimpleEditor?.components ?? {});
