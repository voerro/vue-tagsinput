/**
 * This file is the main import for the built library
 */

import { VueConstructor } from 'vue';
import VoerroTagsInput from './VoerroTagsInput.vue'

export * from './Tag';

export { VoerroTagsInput };

export function install (Vue: VueConstructor) {
    Vue.component('VoerroTagsInput', VoerroTagsInput);
}

export default install;
