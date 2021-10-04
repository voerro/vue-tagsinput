/**
 * This file is the main import for the built library
 */

import { VueConstructor } from 'vue';
import TagsInput from './TagsInput.vue'

export * from './Tag';

export { TagsInput };

export function install (Vue: VueConstructor) {
    Vue.component('TagsInput', TagsInput);
}

export default install;
