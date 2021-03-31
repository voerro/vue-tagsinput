<template>
    <div class="tags-input-root" style="position: relative;">
        <div :class="{
            [wrapperClass + ' tags-input']: true,
            'active': isActive,
            'disabled': disabled,
        }">
            <span v-for="(tag, index) in tags"
                :key="index"
                class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-default"
                :class="{ 'disabled': disabled }"
            >
                <slot name="selected-tag"
                    :tag="tag"
                    :index="index"
                    :removeTag="removeTag"
                >
                    <span v-html="tag[textField]"></span>

                    <a v-show="!disabled"
                        href="#"
                        class="tags-input-remove"
                        @click.prevent="removeTag(index)"></a>
                </slot>
            </span>

            <input type="text"
                ref="taginput"
                :id="inputId"
                :name="inputId"
                :placeholder="placeholder"
                :value="input"
                @input="e => input = e.target.value"
                v-show="!hideInputField"
                @compositionstart="composing=true"
                @compositionend="composing=false"
                @keydown.enter.prevent="tagFromInput(false)"
                @keydown.8="removeLastTag"
                @keydown.down="nextSearchResult"
                @keydown.up="prevSearchResult"
                @keydown="onKeyDown"
                @keyup="onKeyUp"
                @keyup.esc="clearSearchResults"
                @focus="onFocus"
                @click="onClick"
                @blur="onBlur"
                @value="tags">

            <div style="display: none;" v-if="elementId">
                <input v-for="(tag, index) in tags"
                    :key="index"
                    type="hidden"
                    :name="`${elementId}[]`"
                    :value="hiddenInputValue(tag)">
            </div>
        </div>

        <!-- Typeahead/Autocomplete -->
        <div v-show="searchResults.length">
            <p v-if="typeaheadStyle === 'badges'"
                :class="`typeahead-${typeaheadStyle}`"
            >
                <span v-if="!typeaheadHideDiscard"
                    class="tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default"
                    @click.prevent="clearSearchResults(true)"
                    v-text="discardSearchText"></span>

                <span v-for="(tag, index) in searchResults"
                    :key="index"
                    v-html="tag[textField]"
                    @mouseover="searchSelection = index"
                    @mousedown.prevent="tagFromSearchOnClick(tag)"
                    class="tags-input-badge"
                    v-bind:class="{
                        'tags-input-typeahead-item-default': index != searchSelection,
                        'tags-input-typeahead-item-highlighted-default': index == searchSelection
                    }"></span>
            </p>

            <ul v-else-if="typeaheadStyle === 'dropdown'"
                :class="`typeahead-${typeaheadStyle}`"
            >
                <li v-if="!typeaheadHideDiscard"
                    class="tags-input-typeahead-item-default typeahead-hide-btn"
                    @click.prevent="clearSearchResults(true)"
                    v-text="discardSearchText"></li>

                <li v-for="(tag, index) in searchResults"
                    :key="index"
                    v-html="getDisplayField(tag)"
                    @mouseover="searchSelection = index"
                    @mousedown.prevent="tagFromSearchOnClick(tag)"
                    v-bind:class="{
                        'tags-input-typeahead-item-default': index != searchSelection,
                        'tags-input-typeahead-item-highlighted-default': index == searchSelection
                    }"></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        elementId: String,

        inputId: String,

        existingTags: {
            type: Array,
            default: () => {
                return [];
            }
        },

        value: {
            type: Array,
            default: () => {
                return [];
            }
        },

        idField: {
            type: String,
            default: 'key',
        },

        textField: {
            type: String,
            default: 'value',
        },

        displayField: {
          type: String,
          default: null,
        },

        valueFields: {
            type: String,
            default: null,
        },

        disabled: {
            type: Boolean,
            default: false
        },

        typeahead: {
            type: Boolean,
            default: false
        },

        typeaheadStyle: {
            type: String,
            default: 'badges'
        },

        typeaheadActivationThreshold: {
            type: Number,
            default: 1
        },

        typeaheadMaxResults: {
            type: Number,
            default: 0
        },

        typeaheadAlwaysShow: {
            type: Boolean,
            default: false
        },

        typeaheadShowOnFocus: {
            type: Boolean,
            default: true
        },

        typeaheadHideDiscard: {
            type: Boolean,
            default: false
        },

        typeaheadUrl: {
            type: String,
            default: ''
        },

        typeaheadCallback: {
            type: Function,
            default: null
        },

        placeholder: {
            type: String,
            default: 'Add a tag'
        },

        discardSearchText: {
            type: String,
            default: 'Discard Search Results'
        },

        limit: {
            type: Number,
            default: 0
        },

        hideInputOnLimit: {
            type: Boolean,
            default: false
        },

        onlyExistingTags: {
            type: Boolean,
            default: false
        },

        deleteOnBackspace: {
            type: Boolean,
            default: true
        },

        allowDuplicates: {
            type: Boolean,
            default: false
        },

        validate: {
            type: Function,
            default: () => true
        },

        addTagsOnComma: {
            type: Boolean,
            default: false
        },

        addTagsOnSpace: {
            type: Boolean,
            default: false
        },

        addTagsOnBlur: {
            type: Boolean,
            default: false
        },

        wrapperClass: {
            type: String,
            default: 'tags-input-wrapper-default'
        },

        sortSearchResults: {
            type: Boolean,
            default: true
        },

        caseSensitiveTags: {
            type: Boolean,
            default: false
        },

        beforeAddingTag: {
            type: Function,
            default: () => true
        },

        beforeRemovingTag: {
            type: Function,
            default: () => true
        },
    },

    data() {
        return {
            badgeId: 0,
            tags: [],

            input: '',
            oldInput: '',
            hiddenInput: '',

            searchResults: [],
            searchSelection: 0,

            selectedTag: -1,

            isActive: false,
            composing: false,
        };
    },

    created () {
        this.typeaheadTags = this.cloneArray(this.existingTags);

        this.tagsFromValue();

        if (this.typeaheadAlwaysShow) {
            this.searchTag(false);
        }
    },

    mounted () {
        // Emit an event
        this.$emit('initialized');

        document.addEventListener('click', (e) => {
            if (e.target !== this.$refs['taginput']) {
                this.clearSearchResults();
            }
        });
    },

    computed: {
        hideInputField() {
            return (this.hideInputOnLimit && this.limit > 0 && this.tags.length >= this.limit) || this.disabled;
        }
    },

    watch: {
        input(newVal, oldVal) {
            this.searchTag(false);

            if (newVal.length && newVal != oldVal) {
                const diff = newVal.substring(oldVal.length, newVal.length);

                if (this.addTagsOnSpace) {
                    if (newVal.endsWith(' ')) {
                        // The space shouldn't actually be inserted
                        this.input = newVal.trim();

                        // Add the inputed tag
                        this.tagFromInput(true);
                    }
                }

                if (this.addTagsOnComma) {
                    newVal = newVal.trim();

                    if (newVal.endsWith(',')) {
                        // The comma shouldn't actually be inserted
                        this.input = newVal.substring(0, newVal.length - 1);

                        // Add the inputed tag
                        this.tagFromInput(true);
                    }
                }

                this.$emit('change', newVal);
            }
        },

        existingTags(newVal) {
            this.typeaheadTags.splice(0);

            this.typeaheadTags = this.cloneArray(newVal);

            this.searchTag();
        },

        tags() {
            // Updating the hidden input
            this.hiddenInput = JSON.stringify(this.tags);

            // Update the bound v-model value
            this.$emit('input', this.tags);
        },

        value() {
            this.tagsFromValue();
        },

        typeaheadAlwaysShow(newValue) {
            if (newValue) {
                this.searchTag(false);
            } else {
                this.clearSearchResults();
            }
        },
    },

    methods: {
        /**
         * Remove reserved regex characters from a string so that they don't
         * affect search results
         *
         * @param string
         * @returns String
         */
        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },

        /**
         * Add a tag whether from user input or from search results (typeahead)
         *
         * @param ignoreSearchResults
         * @returns void
         */
        tagFromInput(ignoreSearchResults = false) {
            if (this.composing) return;

            // If we're choosing a tag from the search results
            if (this.searchResults.length && this.searchSelection >= 0 && !ignoreSearchResults) {
                this.tagFromSearch(this.searchResults[this.searchSelection]);

                this.input = '';
            } else {
                // If we're adding an unexisting tag
                let text = this.input.trim();

                // If the new tag is not an empty string and passes validation
                if (!this.onlyExistingTags && text.length && this.validate(text)) {
                    this.input = '';

                    // Determine if the inputted tag exists in the typeagedTags
                    // array
                    let newTag = {
                        [this.idField]: '',
                        [this.textField]: text
                    };

                    const searchQuery = this.escapeRegExp(
                        this.caseSensitiveTags
                            ? newTag[this.textField]
                            : newTag[this.textField].toLowerCase()
                    );

                    for (let tag of this.typeaheadTags) {
                        const compareable = this.escapeRegExp(
                            this.caseSensitiveTags
                                ? tag[this.textField]
                                : tag[this.textField].toLowerCase()
                        );

                        if (searchQuery === compareable) {
                            newTag = Object.assign({}, tag);

                            break;
                        }
                    }

                    this.addTag(newTag);
                }
            }
        },

        /**
         * Add a tag from search results when a user clicks on it
         *
         * @param tag
         * @returns void
         */
        tagFromSearchOnClick(tag) {
            this.tagFromSearch(tag);

            this.$refs['taginput'].blur();
        },

        /**
         * Add the selected tag from the search results.
         * Clear search results.
         * Clear user input.
         *
         * @param tag
         * @return void
         */
        tagFromSearch(tag) {
            this.clearSearchResults();
            this.addTag(tag);

            this.$nextTick(() => {
                this.input = '';
                this.oldInput = '';
            });
        },

        /**
         * Add/Select a tag
         *
         * @param tag
         * @param force
         * @returns void | Boolean
         */
        addTag(tag, force = false) {
            if (this.disabled && !force) {
                return;
            }

            if (!this.beforeAddingTag(tag)) {
                return false;
            }

            // Check if the limit has been reached
            if (this.limit > 0 && this.tags.length >= this.limit) {
                this.$emit('limit-reached');

                return false;
            }

            // Attach the tag if it hasn't been attached yet
            if (!this.tagSelected(tag)) {
                this.tags.push(tag);

                // Emit events
                this.$nextTick(() => {
                    this.$emit('tag-added', tag);
                    this.$emit('tags-updated');
                });
            }
        },

        /**
         * Remove the last tag in the tags array.
         *
         * @returns void
         */
        removeLastTag() {
            if (!this.input.length && this.deleteOnBackspace && this.tags.length) {
                this.removeTag(this.tags.length - 1);
            }
        },

        /**
         * Remove the selected tag at the specified index.
         *
         * @param index
         * @returns void
         */
        removeTag(index) {
            if (this.disabled) {
                return;
            }

            let tag = this.tags[index];

            if (!this.beforeRemovingTag(tag)) {
                return false;
            }

            this.tags.splice(index, 1);

            // Emit events
            this.$nextTick(() => {
                this.$emit('tag-removed', tag);
                this.$emit('tags-updated');

                if (this.typeaheadAlwaysShow) {
                    this.searchTag();
                }
            });
        },

        /**
         * Search the currently entered text in the list of existing tags
         *
         * @returns void | Boolean
         */
        searchTag() {
            if (this.typeahead !== true) {
                return false;
            }

            if (this.oldInput != this.input || (!this.searchResults.length && this.typeaheadActivationThreshold == 0) || this.typeaheadAlwaysShow || this.typeaheadShowOnFocus) {
                if (!this.typeaheadUrl.length && !this.typeaheadCallback) {
                    this.searchResults = [];
                }

                this.searchSelection = 0;
                let input = this.input.trim();

                if ((input.length && input.length >= this.typeaheadActivationThreshold) || this.typeaheadActivationThreshold == 0 || this.typeaheadAlwaysShow) {
                    // Find all the existing tags which include the search text
                    const searchQuery = this.escapeRegExp(
                        this.caseSensitiveTags ? input : input.toLowerCase()
                    );

                    // AJAX search
                    if (this.typeaheadCallback) {
                        this.typeaheadCallback(searchQuery)
                            .then((results) => {
                                this.typeaheadTags = results;
                            });
                    } else if (this.typeaheadUrl.length > 0) {
                        this.typeaheadTags.splice(0);
                        const xhttp = new XMLHttpRequest();
                        const that = this;

                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                that.typeaheadTags = JSON.parse(xhttp.responseText);

                                that.doSearch(searchQuery);
                            }
                        }

                        const endpoint = this.typeaheadUrl.replace(':search', searchQuery);
                        xhttp.open('GET', endpoint, true);
                        xhttp.send();
                    } else {
                        // Search the existing collection
                        this.doSearch(searchQuery);
                    }
                }

                this.oldInput = this.input;
            }
        },

        /**
         * Perform the actual search
         *
         * @param string searchQuery
         * @return void
         */
        doSearch(searchQuery) {
            this.searchResults = [];

            for (let tag of this.typeaheadTags) {
                const compareable = this.caseSensitiveTags
                    ? tag[this.textField]
                    : tag[this.textField].toLowerCase();
                const ids = this.searchResults.map((res) => (res[this.idField]));

                if (compareable.search(searchQuery) > -1 && ! this.tagSelected(tag) && ! ids.includes(tag[this.idField])) {
                    this.searchResults.push(tag);
                }
            }

            // Sort the search results alphabetically
            if (this.sortSearchResults) {
                this.searchResults.sort((a, b) => {
                    if (a[this.textField] < b[this.textField]) return -1;
                    if (a[this.textField] > b[this.textField]) return 1;

                    return 0;
                });
            }

            // Shorten Search results to desired length
            if (this.typeaheadMaxResults > 0) {
                this.searchResults = this.searchResults.slice(
                    0,
                    this.typeaheadMaxResults
                );
            }
        },

        /**
         * Hide the typeahead if there's nothing intered into the input field.
         *
         * @returns void
         */
        hideTypeahead() {
            if (! this.input.length) {
                this.$nextTick(() => {
                    this.clearSearchResults();
                });
            }
        },

        /**
         * Select the next search result in typeahead.
         *
         * @returns void
         */
        nextSearchResult() {
            if (this.searchSelection + 1 <= this.searchResults.length - 1) {
                this.searchSelection++;
            }
        },

        /**
         * Select the previous search result in typeahead.
         *
         * @returns void
         */
        prevSearchResult() {
            if (this.searchSelection > 0) {
                this.searchSelection--;
            }
        },

        /**
         * Clear/Empty the search results.
         *
         * @reutrns void
         */
        clearSearchResults(returnFocus = false) {
            this.searchResults = [];
            this.searchSelection = 0;

            if (this.typeaheadAlwaysShow) {
                this.$nextTick(() => {
                    this.searchTag();
                });
            }

            if (returnFocus) {
                this.$refs['taginput'].focus();
            }
        },

        /**
         * Clear the list of selected tags.
         *
         * @returns void
         */
        clearTags() {
            this.tags.splice(0, this.tags.length);
        },

        /**
         * Replace the currently selected tags with the tags from the value.
         *
         * @returns void
         */
        tagsFromValue() {
            if (this.value && this.value.length) {
                if (!Array.isArray(this.value)) {
                    console.error('Voerro Tags Input: the v-model value must be an array!');

                    return;
                }

                let tags = this.value;

                // Don't update if nothing has changed
                if (this.tags == tags) {
                    return;
                }

                this.clearTags();

                for (let tag of tags) {
                    this.addTag(tag, true);
                }
            } else {
                if (this.tags.length == 0) {
                    return;
                }

                this.clearTags();
            }
        },

        /**
         * Check if a tag is already selected.
         *
         * @param tag
         * @returns Boolean
         */
        tagSelected(tag) {
            if (this.allowDuplicates) {
                return false;
            }

            if (! tag) {
                return false;
            }

            const searchQuery = this.escapeRegExp(
                this.caseSensitiveTags ? tag[this.textField] : tag[this.textField].toLowerCase()
            );

            for (let selectedTag of this.tags) {
                const compareable = this.caseSensitiveTags
                    ? selectedTag[this.textField]
                    : selectedTag[this.textField].toLowerCase();

                if (selectedTag[this.idField] === tag[this.idField] && this.escapeRegExp(compareable).length == searchQuery.length && compareable.search(searchQuery) > -1) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Clear the input.
         *
         * @returns void
         */
        clearInput() {
            this.input = '';
        },

        /**
         * Process all the keyup events.
         *
         * @param e
         * @returns void
         */
        onKeyUp(e) {
            this.$emit('keyup', e);
        },

        /**
         * Process all the keydown events.
         *
         * @param e
         * @returns void
         */
        onKeyDown(e) {
            this.$emit('keydown', e);
        },

        /**
         * Process the onfocus event.
         *
         * @param e
         * @returns void
         */
        onFocus(e) {
            this.$emit('focus', e);

            this.isActive = true;
        },

        /**
         * Process the onClick event.
         *
         * @param e
         * @returns void
         */
        onClick(e) {
            this.$emit('click', e);

            this.isActive = true;

            this.searchTag();
        },

        /**
         * Process the onblur event.
         *
         * @param e
         * @returns void
         */
        onBlur(e) {
            this.$emit('blur', e)

            if (this.addTagsOnBlur) {
                // Add the inputed tag
                this.tagFromInput(true);
            }

            if (!this.typeaheadAlwaysShow) {
                this.hideTypeahead();
            } else {
                this.searchTag();
            }

            this.isActive = false;
        },

        hiddenInputValue(tag) {
            // Return all fields
            if (!this.valueFields) {
                return JSON.stringify(tag);
            }

            const fields = this.valueFields.replace(/\s/, '').split(',');

            // A single field
            if (fields.length === 1) {
                return tag[fields[0]];
            } else {
                // Specified fields
                return JSON.stringify(
                    Object.assign(
                        {},
                        ...fields.map(field => ({ [field]: tag[field] }))
                    )
                );
            }

            return JSON.stringify(tag);
        },

        getDisplayField(tag) {
            const hasDisplayField = this.displayField !== undefined
                && this.displayField !== null
                && tag[this.displayField] !== undefined
                && tag[this.displayField] !== null
                && tag[this.displayField] !== '';

            return hasDisplayField
                ? tag[this.displayField]
                : tag[this.textField];
        },

        cloneArray(arr) {
            return arr.map(el => Object.assign({}, el));
        }
    }
}
</script>
