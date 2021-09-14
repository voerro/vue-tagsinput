<template>
<div>
    <section class="hero is-info">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">@voerro/vue-tagsinput</h1>

                <h2 class="subtitle">
                    Tags input for Vue.js 2 by
                    <a href="http://voerro.com">Voerro</a>
                </h2>
            </div>
        </div>
    </section>

    <div id="voerro-tags-input-demo-vqk6etkfjrcpsjg5">

        <div style="padding: 2rem;">
            <div class="columns">
                <div class="column is-3">
                    <h2 class="is-size-4" style="margin-bottom: 1rem;">
                        <a href="https://github.com/voerro/vue-tagsinput" target="_blank">Documentation</a>
                    </h2>

                    <h2 class="is-size-4" style="margin-bottom: 1rem;">Options</h2>

                    <div class="field">
                        <label class="label">Placeholder</label>

                        <div class="control">
                            <input class="input" type="text" v-model="placeholder">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Limit</label>
                    
                        <div class="control">
                            <input class="input" type="text" v-model="limit">
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="hideInputOnLimit">
                                Hide Input on Limit
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="typeahead"> Typeahead/autocomplete on
                            </label>
                        </div>
                    </div>

                    <div v-show="typeahead" class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="typeheadAlwaysShow">
                                Always show Typeahead
                            </label>
                        </div>
                    </div>

                    <div v-show="typeahead" class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="typeaheadShowOnFocus">
                                Show Typeahead on focus
                            </label>
                        </div>
                    </div>

                    <div v-show="typeahead" class="field">
                        <div class="control">
                            <label class="checkbox">
                            <input type="checkbox" v-model="typeaheadHideDiscard">
                            Hide 'Discard Search Results' button
                            </label>
                        </div>
                    </div>

                    <div v-show="typeahead" style="margin-bottom: 1rem;">
                        <div class="field">
                            <label class="label">Typeahead Style</label>
                        
                            <div class="control">
                                <select class="input" type="text" v-model="typeaheadStyle">
                                    <option value="badges">Badges</option>
                                    <option value="dropdown">Dropdown</option>
                                </select>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Typeahead Max Results</label>
                        
                            <div class="control">
                                <input class="input" type="text" v-model="typeaheadMaxResults">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Typeahead Activation Threshold</label>
                        
                            <div class="control">
                                <input class="input" type="text" v-model="typeaheadActivationThreshold">
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="onlyExistingTags"> 
                                Allow to add only existing tags
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="caseSensitiveTags"> 
                                Tags are case sensitive
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="deleteOnBackspace"> 
                                Delete on Backspace
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="allowDuplicates"> 
                                Allow Duplicates
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="addTagsOnComma"> 
                                Add Tags on Comma
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="addTagsOnSpace"> 
                                Add Tags on Space
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="addTagsOnBlur"> 
                                Add Tags on Blur
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="logChangeEvents">
                                Log Change Events
                            </label>
                        </div>
                    </div>
                </div>

                <div class="column is-9">
                    <voerro-tags-input
                        v-model="selectedTags"
                        element-id="tags"
                        :existing-tags="[
                            { key: 'children-of-bodom', value: 'Children of Bodom' },
                            { key: 'epica', value: 'Epica' },
                            { key: 'emperor', value: 'Emperor' },
                            { key: 'shape-of-despair', value: 'Shape of Despair' },
                            { key: 'protest-the-hero', value: 'Protest the Hero' },
                            { key: 'my-dying-bride', value: 'My Dying Bride' },
                            { key: 'ne-obliviscaris', value: 'Ne Obliviscaris' },
                            { key: 'belakor', value: 'Be\'lakor' },
                            { key: 'dark-lunacy', value: 'Dark Lunacy' },
                            { key: 'dominia', value: 'Dominia' },
                            { key: 'jason-becker', value: 'Jason Becker' },
                            { key: 'jeff-loomis', value: 'Jeff Loomis' },
                            { key: 'persefone', value: 'Persefone' },
                        ]"
                        :typeahead="typeahead"
                        :typeahead-style="typeaheadStyle"
                        :typeahead-max-results="typeaheadMaxResults"
                        :typeahead-activation-threshold="typeaheadActivationThreshold"
                        :typeahead-always-show="typeheadAlwaysShow"
                        :typeahead-show-on-focus="typeaheadShowOnFocus"
                        :typeahead-hide-discard="typeaheadHideDiscard"
                        :placeholder="placeholder"
                        :limit="limit"
                        :only-existing-tags="onlyExistingTags"
                        :case-sensitive-tags="caseSensitiveTags"
                        :delete-on-backspace="deleteOnBackspace"
                        :allow-duplicates="allowDuplicates"
                        :add-tags-on-comma="addTagsOnComma"
                        :add-tags-on-space="addTagsOnSpace"
                        :add-tags-on-blur="addTagsOnBlur"
                        :hide-input-on-limit="hideInputOnLimit"
                        @initialized="onInitialized"
                        @tag-added="onTagAdded"
                        @tag-removed="onTagRemoved"
                        @tags-updated="onTagsUpdated"
                        @change="onChange"
                        discard-search-text="Discard search results"
                    ></voerro-tags-input>

                    <hr>

                    <h2 class="is-size-5">Selected tags (via v-model):</h2>

                    <p v-text="selectedTags"></p>

                    <h2 class="is-size-5" style="margin-top: 1rem;">Data Events (new at the top)</h2>
                    
                    <pre v-text="eventLog"></pre>

                    <hr>

                    <h2 class="is-size-3 mb-1">Custom Display Field for the Dropdown</h2>

                    <p class="mb-1">
                        The `display-field` prop in action. You can provide any custom HTML for your dropdown rows and style them any way you want.
                    </p>

                    <voerro-tags-input
                        v-model="selectedTags2"
                        element-id="tags2"
                        :existing-tags="[
                            { key: 'microsoft', value: 'Microsoft', display: '<div class=row><div class=icon>MS</div><div class=text><div class=name>Microsoft</div><div class=address>One Microsoft Way, Redmond, WA 98052-6399, USA</div></div></div>' },
                            { key: 'google', value: 'Google', display: '<div class=row><div class=icon>GL</div><div class=text><div class=name>Google</div><div class=address>1600 Amphitheatre Parkway, Mountain View, California, USA</div></div></div>' },
                            { key: 'facebook', value: 'Facebook', display: '<div class=row><div class=icon>FB</div><div class=text><div class=name>Facebook</div><div class=address>1 Hacker Way, Menlo Park, 94025, California, USA</div></div></div>' },
                            { key: 'apple', value: 'Apple', display: '<div class=row><div class=icon>AP</div><div class=text><div class=name>Apple</div><div class=address>One Apple Park Way, Cupertino, California, USA</div></div></div>' },
                        ]"
                        :typeahead="true"
                        typeahead-style="dropdown"
                        :typeahead-show-on-focus="true"
                        placeholder="Enter a company name"
                        :only-existing-tags="true"
                        :case-sensitive-tags="false"
                        display-field="display"
                    ></voerro-tags-input>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tag } from './Tag';
import VoerroTagsInput from './VoerroTagsInput.vue';

export default Vue.extend({
    components: {
        VoerroTagsInput,
    },
    data: () => ({
        selectedTags: [
            {
                key: 'ne-obliviscaris',
                value: 'Ne Obliviscaris'
            },
            {
                key: 'epica',
                value: 'Epica'
            },
            {
                key: 'shape-of-despair',
                value: 'Shape of Despair'
            },
        ] as Tag[],
        typeahead: true,
        typeaheadStyle: 'badges',
        placeholder: 'Customizable placeholder',
        limit: 0,
        onlyExistingTags: false,
        caseSensitiveTags: false,
        deleteOnBackspace: true,
        allowDuplicates: false,
        addTagsOnComma: false,
        addTagsOnSpace: false,
        addTagsOnBlur: false,
        hideInputOnLimit: false,
        typeaheadHideDiscard: false,
        typeaheadMaxResults: 20,
        typeaheadActivationThreshold: 1,
        typeheadAlwaysShow: false,
        typeaheadShowOnFocus: true,
        logChangeEvents: false,

        // Display fields demo
        eventLog: '',
        selectedTags2: [] as Tag[],
    }),
    methods: {
        logEvent(text: string) {
            this.eventLog = text + this.eventLog;
        },

        onInitialized() {
            this.logEvent('Initialized\n');
        },

        onTagAdded(tag: Tag) {
            this.logEvent(`Tag added: "${JSON.stringify(tag)}"\n`);
        },

        onTagRemoved(tag: Tag) {
            this.logEvent(`Tag removed: "${JSON.stringify(tag)}"\n`);
        },

        onTagsUpdated() {
            this.logEvent('Tags updated\n');
        },

        onChange(evt: Event) {
            if (this.logChangeEvents) {
                this.logEvent(`Changed ${JSON.stringify(evt)}\n`);
            }
        },
    }
})
</script>