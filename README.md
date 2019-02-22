# Vue Tags Input

[![npm (scoped)](https://img.shields.io/npm/v/@voerro/vue-tagsinput.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-tagsinput)
[![npm](https://img.shields.io/npm/dm/@voerro/vue-tagsinput.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-tagsinput)
[![MIT](https://img.shields.io/github/license/AlexMordred/vue-tagsinput.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A simple tags input with typeahead built with Vue.js 2.

![](demo.gif)
![](demo2.gif)

[**Live Demo**](https://voerro.github.io/vue-tagsinput/)

## Installation via NPM

```
npm i @voerro/vue-tagsinput --save-dev
```
or
```
npm i @voerro/vue-tagsinput --save
```

Then register the component with Vue:

```javascript
import VoerroTagsInput from '@voerro/vue-tagsinput';

Vue.component('tags-input', VoerroTagsInput);
```

Include the `dist/style.css` file on your page to apply the styling. You can use CDN, `require()` it inside your JS code, or `@include` it inside your (S)CSS assets. Read the `Styling` section to learn how to customize the appearance.

## Installation via CDN

If you're not using NPM, you can include the required files into your page manually from a CDN. Don't forget to include Vue as well. For example:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@voerro/vue-tagsinput@1.8.0/dist/voerro-vue-tagsinput.js"></script>

<script>
    new Vue({
        el: '#app',
        components: { "tags-input": VoerroTagsInput },
    });
</script>
```

Include the CSS file on your page to apply the styling. Read the `Styling` section to learn how to customize the appearance.

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@voerro/vue-tagsinput@1.8.0/dist/style.css">
```

**IMPORTANT:** Always grab the latest versions of the package from [JSDELIVR](https://www.jsdelivr.com/package/npm/@voerro/vue-tagsinput?path=dist), the ones provided in the examples above might be outdated. Same goes for Vue.js.

## Usage

```html
<tags-input element-id="tags"
    v-model="selectedTags"
    :existing-tags="{ 
        'web-development': 'Web Development',
        'php': 'PHP',
        'javascript': 'JavaScript',
    }"
    :typeahead="true"></tags-input>
```

```html
<tags-input element-id="tags"
    v-model="selectedTags"
    :existing-tags="{ 
        1: 'Web Development',
        2: 'PHP',
        3: 'JavaScript',
    }"
    :typeahead="true"></tags-input>
```

`element-id` will be applied to `id` and `name` attributes of the hidden input that contains the list of the selected tags as its value. Optionally you can also use the `v-model` directive to bind a variable to the array of selected tags.

`existing-tags` is the list of the existing on your website tags. Include it even if you're not using typeahead.

Remove the `typeahead` property to disable this functionality.

#### Setting Selected Tags Programmatically

If you need to programmatically (manually) set or change the list of selected tags from "outside" - just set the required value to the variable bound with the component via `v-model`.

Acceptable values:
- an array of tag slugs or tag strings
- a string with tags separated via comma)

For example, the variable name is `selectedTags`:
```html
<tags-input element-id="tags" 
    v-model="selectedTags"></tags-input>
```

You can pre-set the value of this variable:
```javascript
new Vue({
    el: '#app',

    components: { VoerroTagsInput },

    data: {
        selectedTags: [
            'tags',
            'selected',
            'by',
            'default',
        ],
        // ALTERNATIVELY
        selectedTags: 'tags,selected,by,default',
    }
});
```

... or change it whenever you need to:
```javascript
new Vue({
    el: '#app',

    components: { VoerroTagsInput },

    data: {
        selectedTags: [],
    },

    methods: {
        setSelectedTags() {
            this.selectedTags = ['programmatically', 'selected', 'tags'];
            // ALTERNATIVELY
            this.selectedTags = 'programmatically,selected,tags';
        }
    }
});
```

#### All Available Props

Prop | Type | Default | Description
--- | --- | --- | ---
elementId | String | - | id & name for the hidden input.
existingTags | Object | {} | An object with existing tags where keys are tag slugs or ids and values are strings to be displayed.
typeahead | Boolean | false | Whether the typeahead (autocomplete) functionality should be enabled.
typeahead-style | String | 'badges' | The autocomplete prompt style. Possible values: `badges`, `dropdown`.
typeahead-max-results | Number | 0 | Maximum number of typeahead results to be shown. 0 - unlimited.
typeahead-activation-threshold | Number | 1 | Show typeahead results only after at least this many characters were entered. When set to 0, typeahead with all the available tags will be displayed on input focus.
placeholder | String | 'Add a tag' | The placeholder of the tag input.
limit | Number | 0 | Limit the number of tags that can be chosen. 0 = no limit.
only-existing-tags | Boolean | false | Only existing tags can be added/chosen. New tags won't be created.
delete-on-backspace | Boolean | true | Whether deleting tags by pressing Backspace is allowed.
allow-duplicates | Boolean | false | Allow users to add the same tags multiple times.
validate | Function | `text => true` | Callback to validate tags' text with.
add-tags-on-comma | Boolean | false | Add new tags when comma is pressed.

#### Events

Event | Description
--- | ---
@initialized | Fired when the component is completely ready to be worked with. Fired from the Vue.js' `mounted()` method.
@tag-added | Fired when a new tag is added. The slug of the tag is passed along.
@tag-removed | Fired when a tag is removed. The slug of the tag is passed along.
@tags-updated | Fired when a tag is added or removed.

```html
<voerro-tags-input
    ...
    @initialized="onInitialized"
    @tag-added="onTagAdded"
    @tag-removed="onTagRemoved"
    @tags-updated="onTagsUpdated"
></voerro-tags-input>
```

```javascript
<script>
new Vue({
    ...

    methods: {
        onInitialized() {
            console.log('Initialized');
        },

        onTagAdded(slug) {
            console.log(`Tag added: ${slug}`);
        },

        onTagRemoved(slug) {
            console.log(`Tag removed: ${slug}`);
        },

        onTagsUpdated() {
            console.log('Tags updated');
        },
    }
});
</script>
```

## Data

The list of selected tags is stored as a string (tags separated with a comma) inside a hidden input with id and name set to the value from the `element-id` props (but only if you've provided this prop).

You can also bind the array of selected tags to a variable via `v-model`.

If a tag is listed in `existing-tags`, the tag's slug will be used, otherwise the text entered by user is added.

Example value of the hidden input:
```
web-development,javascript,This is a new tag,php
```

## Styling

If you want to completely re-style the component - write your own styles from scratch using `dist/style.css` as a reference. Alternatively you can override specific parts of `dist/style.css` using `!important`.

Certain classes/styles can be overridden via component props on a per instance basis in case you just want to make minor changes, e.g. you just want to change colors.

Prop | Default class | Area
--- | --- | ---
wrapper-class | tags-input-wrapper-default | Outer appearance of the input - a wrapper providing a border and padding around the selected tags. If you're using CSS frameworks, you could use the frameworks' native classes, e.g. `form-control` for Bootstrap or `input` for Bulma.

## Using Typeahead (Autocomplete)

When search results are displayed underneath the input, use the `arrow down` and `arrow up` keys on the keyboard to move the selection. Press `Enter` to select a tag. Press `Esc` to discard the search results and then `Enter` to add a new tag the way you've typed it.

## Updating From Older Versions

#### Older versions up to v1.4.0 -> v1.5.0

The `oldTags` property was removed. See the `Setting Selected Tags Programmatically` section on how to (pre)set the list of existing tags.

#### v1.5.0 -> v1.5.1

`TagsInput` was renamed to `VoerroTagsInput` to eliminate possible name conflicts with other packages.

## Support

This software is absolutely free to use and is developed in the author's free time. If you found this software useful and would like to say thank you to the author, please consider making a donation. It's not the amount, it's the gesture.

- BTC (Bitcoin): 34ReKHWmSoGbcEHJw3HtyZ5CXz1UfoUKG5
- PayPal: https://paypal.me/AlexanderZavyalov
