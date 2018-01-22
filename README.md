# Vue Tags Input

[![npm (scoped)](https://img.shields.io/npm/v/@voerro/vue-tagsinput.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-tagsinput)
[![npm](https://img.shields.io/npm/dm/@voerro/vue-tagsinput.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-tagsinput)
[![MIT](https://img.shields.io/github/license/AlexMordred/vue-tagsinput.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A simple tags input with typeahead built with Vue.js 2.

![](demo.gif)

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
Vue.component('tags-input', require('@voerro/vue-tagsinput'));
```

If you're getting the `[Vue warn]: Failed to mount component: template or render function not defined.` error, try this instead:

```javascript
Vue.component('tags-input', require('@voerro/vue-tagsinput').default);
```

You might also need to add this line if removing tags by pressing backspace doesn't work:

```javascript
Vue.config.keyCodes.backspace = 8;
```

## Usage

```html
<tags-input element-id="tags"
            :existing-tags="{ 
                'web-development': 'Web Development',
                'php': 'PHP',
                'javascript': 'JavaScript',
            }"
            :typeahead="true"></tags-input>
```

`element-id` will be applied to `id` and `name` attributes of the hidden input that contains the list of the selected tags as its value.

`existing-tags` is the list of the existing on your website tags. Include it even if you're not using typeahead.

Remove the `typeahead` property to disable this functionality.

#### "Old" Tags

If you need to display a list of already attached tags, use the `:old-tags` property. Provide a list in the same format as with `existing-tags`. In this Laravel example we attach either the tags from `old()`, the tags of an existing blog post, or nothing, depending on what's available.

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

## Data

The list of selected tags is stored as a string (tags are separated with a comma) inside a hidden input with name = `element-id`.

If a tag is listed in `existing-tags`, the tag's slug will be used, otherwise the text entered by user is added.

Example value of the hidden input:
```
web-development,javascript,This is a new tag,php
```

## Styling

The component partially relies on default Bootstrap 4 classes for styling. If you don't use Bootstrap in your project, use the `bootstrap.css` file included in this repository. It is an extraction of all the required classes.

You can apply your own css. The visible input is a `div` with classes `.form-control` and `.tags-input`. Each tag inside is a `span` with standard Bootstrap 4 classes `.badge`, `.badge-pill`, and `.badge-light`. The remove buttons of each tags are `.tagsinput-remove`.

The typeahead parent element is a `p` with `.typeahead` class. Its children are `span`s with standard Bootstrap 4 classes `.badge`, `.badge-primary` (for the selected tag), `.badge-dark` (for all the unselected tags).

See the `template` and `style` sections of `src/TagsInput.vue` to have a better idea of how things work.

## Typeahead

When search results are displayed underneath the input, use the `arrow down` and `arrow up` keys on the keyboard to move the selection. Press `Enter` to select a tag. Press `Esc` to discard the search results and then `Enter` to add a new tag the way you've typed it.

## License

This is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
