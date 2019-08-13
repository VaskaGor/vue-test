<template>
    <div id="sections" class="sections">
        <div class="sections__header">
            <div class="section__avatar">
                <img src=".././images/default-avatar.jpg" alt="Avatar">
            </div>
            David Hill
            <div class="sections__header-add-new" title="Add section" @click="addSection">
                <i class="material-icons">add_circle</i>
            </div>
        </div>

        <div class="sections__content">
            <div @click="onSelectNewSection(section)" v-for="section in sectionList" v-bind:key="section.id">
                <Section class="section" :class="{'_active' : section.id === selectedSection.id}"
                         :section=section></Section>
            </div>
        </div>
    </div>
</template>

<script>
    import Section from "./Section";

    export default {
        name: "Sections",
        components: {Section},
        props: ['sectionList', 'selectedSection'],
        methods: {
            addSection: function () {
                let newSection = {
                    name: "New section",
                    id: this.sectionList.length + 1,
                    messages: []
                };
                this.$emit('addNewSection', newSection);
            },
            onSelectNewSection: function (section) {
                this.$emit('changeSelect', section);
            },
        }
    }
</script>

<style scoped lang="scss">
    .sections {
        max-width: 300pt;
        min-width: 300pt;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .sections__header {
        width: 100%;
        height: 50pt;
        border-bottom: 1pt solid var(--divider-color);
        background-color: var(--dark-blue-color);
        display: flex;
        align-items: center;
        color: var(--text-white-color);
        font-size: 12pt;
        flex-grow: 1;
    }

    .section__avatar {
        height: 100%;
        width: 50pt;
        justify-content: center;
        align-items: center;
        display: flex;
        padding-left: 15px;
        position: relative;
    }

    .section__avatar > img {
        width: 32pt;
        height: 32pt;
        border-radius: 10%;
    }

    .sections__header-add-new {
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
        padding-right: 20px;
        align-items: center;
    }

    .sections__header-add-new > i {
        height: 20pt;
        width: 20pt;
        padding: 5pt;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        font-size: 40px;
        align-items: center;
        color: var(--text-gray-color);
    }

    .sections__header-add-new > i:hover {
        box-shadow: 0px 6px 14px -4px rgba(117, 117, 117, 1);
        cursor: pointer;
    }

    .sections__content {
        width: 100%;
        height: calc(100% - 50pt);
        background-color: var(--dark-blue-color);
        overflow-y: auto;
        overflow-x: hidden;
    }

    .section {
        width: 100%;
        height: 15pt;
        display: flex;
        flex-direction: row;
        padding: 4pt;
        min-width: calc(100% - 20pt);
        cursor: pointer;
    }

    .section:hover {
        box-shadow: 0px 6px 14px -4px rgba(117, 117, 117, 1);
    }

    .section._active {
        background-color: var(--select-color);
        width: calc(100% - 10pt);
        border-radius: 10px;
        /*box-shadow: 0px 6px 14px -4px rgba(117, 117, 117, 1);*/
    }
</style>