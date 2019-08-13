<template>
    <div class="section__info">
        <div class="section__info-name">
            {{section.name}}
        </div>
        <div class="section__info-counter" v-if="section.messages.length > 0">
            ({{section.messages.length}})
        </div>
    </div>
</template>

<script>
    export default {
        name: "Section",
        props: ['section'],
    }
</script>

<style scoped lang="scss">
    .section__info {
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .section__info-name {
        max-width: 80%;
        height: 20pt;
        display: inline;
        font-weight: bold;
        float: left;
        margin-left: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--text-white-color);
    }

    .section__info-counter{
        height: 20pt;
        display: inline;
        float: left;
        font-weight: bold;
        padding-left: 5px;
        margin-left: 5px;
        color: var(--text-white-color);
    }
</style>