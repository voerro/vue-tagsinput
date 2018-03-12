# Vue Tags Input

[![npm (scoped)](https://img.shields.io/npm/v/@voerro/vue-tagsinput.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-tagsinput)
[![npm](https://img.shields.io/npm/dm/@voerro/vue-tagsinput.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-tagsinput)
[![MIT](https://img.shields.io/github/license/AlexMordred/vue-tagsinput.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A simple tags input with typeahead built with Vue.js 2.

![](demo.gif)

[Live Demo](https://voerro.github.io/vue-tagsinput/)

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
import TagsInput from '@voerro/vue-tagsinput';

Vue.component('tags-input', TagsInput);
```

You might also need to add this line if removing tags by pressing backspace doesn't work (usually it works without the line):

```javascript
Vue.config.keyCodes.backspace = 8;
```

Also read the `Styling` section to learn how to make the input look like in the live demo.

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

#### "Old" Tags

If you need to display a list of already attached tags, use the `:old-tags` property. Provide an array of tag slugs, tag ids, or just strings.

```html
<tags-input element-id="tags"
    :existing-tags="{ 
        'web-development': 'Web Development',
        'php': 'PHP',
        'javascript': 'JavaScript',
    }"
    :old-tags="[
        'php',
        'javascript',
    ]"
    :typeahead="true"></tags-input>
```

In this Laravel example we attach either the tags from `old()`, the tags of an existing blog post, or nothing, depending on what's available.

```html
<tags-input element-id="tags"
    :existing-tags="{ 
        'web-development': 'Web Development',
        'php': 'PHP',
        'javascript': 'JavaScript',
    }"
    :old-tags="{{ 
        old('tags') ? json_encode(old('tags')) :
        (
            isset($postTags)
            ? json_encode($postTags)
            : json_encode('')
        ) 
    }}"
    :typeahead="true"></tags-input>
```

#### All Available Props

Prop | Type | Default | Required | Description
--- | --- | --- | --- | ---
elementId | String | - | no | id & name for the hidden input
existingTags | Object | {} | no | An object with existing tags where keys are tag slugs or ids and values are strings to be displayed
oldTags | Array, String | [] | no | A list of already selected tags in the form of an array or a comma separated string.
typeahead | Boolean | false | no | Whether the typeahead (autocomplete) functionality should be enabled.
placeholder | String | 'Add a tag' | no | The placeholder of the tag input.
limit | Number | 0 | no | Limit the number of tags that can be chosen. 0 = no limit.
only-existing-tags | Boolean | false | no | Only existing tags can be added/chosen. New tags won't be created.
input-class | String | 'tags-input-default-class' | no | Apply a class to make the wrapping div look like an input. For example, you can use 'form-control' for Bootstrap or 'input' for Bulma.

## Data

The list of selected tags is stored as a string (tags separated with a comma) inside a hidden input with id and name set to the value from the `element-id` props (but only if you've provided this prop).

You can also bind the array of selected tags to a variable via `v-model`.

If a tag is listed in `existing-tags`, the tag's slug will be used, otherwise the text entered by user is added.

Example value of the hidden input:
```
web-development,javascript,This is a new tag,php
```

## Styling

To apply styling include the `dist/style.css` file on your page. Copy and edit the file if you want to modify the package's appearance. If you're using Bootstrap 4 you can delete the `.badge*` classes as they were copied from the default Bootstrap 4's css.

You can apply a wrapper class to make the input look different via the `input-class` prop. `input-class="form-control"` if you're working with bootstrap, `input-class="input"` if you're working with Bulma, or `input-class="your-custom-class"` if you have something else.

## Typeahead

When search results are displayed underneath the input, use the `arrow down` and `arrow up` keys on the keyboard to move the selection. Press `Enter` to select a tag. Press `Esc` to discard the search results and then `Enter` to add a new tag the way you've typed it.

## License

This is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
