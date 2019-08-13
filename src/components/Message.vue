<template>
    <div class="message">
        <div class="message__text">
            {{message.content}}
        </div>
        <div class="message__time">{{message.date}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Message",
        props: ['message'],
    }
</script>

<style scoped lang="scss">
    .message {
        height: 80pt;
        width: calc(100% - 40pt);
        padding: 10pt;
        align-self: flex-start;
        box-shadow: 0px 6px 14px -4px rgba(117, 117, 117, 1);
        position: relative;
        margin: 14pt 10pt 5pt;
        color: var(--text-black-color);
        background-color: var(--text-white-color);
    }

    .message:hover {
        cursor: pointer;
    }

    .message__text {
        height: 60pt;
        overflow-y: auto;
        text-align: left;
        padding-top: 10pt;
        display: flex;
        word-wrap: break-word;
        align-self: flex-start;
        color: var(--text-black-color);
        background-color: var(--text-white-color);
    }

    .message__time {
        justify-content: center;
        padding-right: 10pt;
        bottom: 5pt;
        right: 0;
        left: 0;
        color: var(--text-gray-color);
        text-align: right;
    }
</style>