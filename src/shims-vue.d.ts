/* Shim file to help typescript understand vue files */

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
