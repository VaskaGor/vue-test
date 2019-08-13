<template>
    <div id="messages" class="messages">
        <div class="messages__header">
            <div class="messages__header-title" v-if="!editSectionName">
                {{sectionName}}
            </div>
            <div class="messages__input-field" v-if="editSectionName">
                <input type="text" maxlength="30" placeholder="Section title" v-model="newSectionName">
                <div class="messages__header-buttons">
                    <div class="messages__header-btn" title="It-s ok" @click="updateSectionName">
                        <i class="material-icons">done</i>
                    </div>
                    <div class="messages__header-btn" title="Ah shit, here we go again" @click="notUpdateSectionName">
                        <i class="material-icons">cancel</i>
                    </div>
                </div>
            </div>
            <div class="messages__header-buttons" v-if="sectionName != null && !editSectionName ">
                <div class="messages__header-btn" title="Rename section" @click="editSectionName = !editSectionName">
                    <i class="material-icons">edit</i>
                </div>
                <div class="messages__header-btn" title="Remove section" @click="removeSection">
                    <i class="material-icons">delete</i>
                </div>
            </div>
        </div>
        <div class="messages__content">
            <div v-for="message in sectionMessages" v-bind:key="message.content">
                <Message :message=message></Message>
            </div>
        </div>
        <div class="messages__input" v-if="sectionName != null">
            <div class="messages__input-field">
                <input type="text" placeholder="Enter message text" v-model="newMessage">
            </div>
            <div class="messages__input-send-btn" title="Send message" @click="addMessage">
                <i class="material-icons">send</i>
            </div>
        </div>
    </div>
</template>

<script>
    import Message from "./Message";

    export default {
        name: "Messages",
        components: {Message},
        props: ['sectionName', "sectionMessages"],
        data: function () {
            return {
                newMessage: '',
                newSectionName: this.sectionName,
                editSectionName: false
            };
        },
        watch: {
            sectionName: function (newVal) {
                this.editSectionName = false;
                this.newSectionName = newVal;
            }
        },
        methods: {
            updateSectionName() {
                this.editSectionName = !this.editSectionName;
                this.$emit('updateSectionName', this.newSectionName);
            },
            notUpdateSectionName() {
                this.editSectionName = !this.editSectionName;
                this.newSectionName = this.sectionName;
            },
            removeSection() {
                this.$emit('removeSection');
            },
            addMessage() {
                if (!this.newMessage || !this.newMessage.trim()) {
                    return;
                }
                let currentDate = new Date();
                let newMessage = {
                    content: this.newMessage,
                    date: currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString()
                };
                this.$emit('addNewMessage', newMessage);
                this.newMessage = '';
            }
        }
    }
</script>

<style scoped lang="scss">
    .messages {
        width: 50%;
        height: 100%;
        border-left: 1pt solid var(--divider-color);
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

    .messages__header {
        width: 100%;
        height: 50pt;
        border-bottom: 1pt solid var(--divider-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16pt;
        font-weight: bold;
    }

    .messages__header-title {
        display: flex;
        flex-grow: 20;
        min-width: 20%;
        overflow: hidden;
        justify-content: center;
        text-overflow: ellipsis;
        align-items: center;
    }

    .messages__header-buttons {
        display: flex;
        flex-direction: row;
        padding-right: 20px;
        padding-left: 10px;
    }

    .messages__header-btn {
        display: flex;
        padding-right: 10px;
        flex-grow: 1;
    }

    .messages__header-btn > i {
        height: 20pt;
        width: 20pt;
        padding: 5pt;
        border-radius: 50%;
        font-size: 14pt;
        background-color: var(--select-color);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-white-color);
    }

    .messages__header-btn > i:hover {
        box-shadow: 0px 6px 14px -4px rgba(117, 117, 117, 1);
        cursor: pointer;
    }

    .messages__input {
        display: flex;
        border-top: 1pt solid var(--divider-color);
        flex-direction: row;
        align-items: center;
        padding-top: 5pt;
        padding-bottom: 5pt;
    }

    .messages__input-field {
        display: flex;
        flex-grow: 27;
        height: 30pt;
        padding-left: 10px;
    }

    .messages__input-field > input {
        width: 96%;
        height: 50%;
        border-radius: 15pt;
        box-shadow: none;
        border: 2pt solid var(--divider-color);
        outline: none;
        padding: 5pt;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        font-size: 12pt;
    }

    .messages__input-field > input:focus {
        border: 2pt solid var(--select-color);
        box-shadow: 0px 6px 14px -4px rgba(117, 117, 117, 1);
    }

    .messages__input-send-btn {
        display: flex;
        flex-grow: 1;
    }

    .messages__input-send-btn > i {
        height: 20pt;
        width: 20pt;
        padding: 5pt;
        border-radius: 50%;
        font-size: 14pt;
        background-color: var(--select-color);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-white-color);
    }

    .messages__input-send-btn > i:hover {
        box-shadow: 0px 6px 14px -4px rgba(117, 117, 117, 1);
        cursor: pointer;
    }

    .messages__content {
        display: flex;
        height: calc(100% - 85pt);
        background-color: var(--light-blue-color);
        overflow-y: scroll;
        padding: 5pt;
        flex-direction: column;
    }
</style>