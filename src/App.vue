<template>
    <div class="content" id="app">
        <Sections
                  :section-list="sections"
                  :selected-section="selectedSection"
                  @changeSelect="onSelectSection"
                  @addNewSection="onAddNewSection"/>
        <Messages
                  :section-name="selectedSection ? selectedSection.name : null"
                  :section-messages="selectedSection ? selectedSection.messages : null"
                  @addNewMessage="onAddNewMessage"
                  @updateSectionName="onUpdateSectionName"
                  @removeSection="onRemoveSection(selectedSection)"/>
    </div>
</template>

<script>
    import Sections from "./components/Sections";
    import Messages from "./components/Messages";

    export default {
        name: 'app',
        components: {
            Messages,
            Sections
        },
        beforeMount() {
            if (localStorage.getItem('sections')) {
                try {
                    this.sections = JSON.parse(localStorage.getItem('sections'));
                    this.selectedSection = this.sections[0];
                } catch(e) {
                    localStorage.removeItem('sections');
                }
            }
        },
        updated() {
            const parsed = JSON.stringify(this.sections);
            localStorage.setItem('sections', parsed);
        },
        data: function () {
            return {
                sections: [],
                selectedSection: null
            }
        },
        methods: {
            onSelectSection: function (section) {
                this.selectedSection = section;

                setTimeout(function () {
                    var objDiv = document.getElementsByClassName("messages__content")[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 0);
            },
            onAddNewSection: function (section) {
                this.selectedSection = section;
                this.sections.unshift(section);
            },
            onAddNewMessage: function (message) {
                this.selectedSection.messages.push(message);

                setTimeout(function () {
                    var objDiv = document.getElementsByClassName("messages__content")[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 0);
            },
            onUpdateSectionName: function (sectionName) {
                this.selectedSection.name = sectionName;
            },
            onRemoveSection: function (section) {
                this.sections = this.sections.filter(s => s != section);
                this.selectedSection = this.sections[0];
            }
        }
    }
</script>

<style lang="scss">
    body {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        background-color: #CFD8DC;

        /*colors*/
        --text-white-color: #FFFFFF;
        --text-black-color: #212121;
        --text-gray-color: #757575;
        --dark-blue-color: #05222A;
        --light-blue-color: #DAE8F3;
        --select-color: #117FA4;
        --divider-color: #BDBDBD;
    }

    .content {
        margin-left: 20pt;
        margin-right: 20pt;
        min-width: 800pt;
        min-height: 300pt;
        height: 86vh;
        margin-top: 8pt;
        background-color: var(--text-white-color);
        border: 1pt solid var(--divider-color);
        display: flex;
        flex-direction: row;
    }

    .footer {
        width: 90%;
        margin-top: 15pt;
        align-self: center;
        display: flex;
        flex-direction: row;
        padding-left: 20pt;
        justify-content: flex-start;
    }

    .footer > a {
        padding-left: 5pt;
    }
</style>
