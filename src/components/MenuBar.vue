<template>
    <div class="text-center bg-white mr-lg-5 left-nav px-lg-0 px-4">
        <ul class="list-unstyled mt-4 list-group">
            <router-link to="/" tag="li" class="list-group-item cursor-pointer" exact-active-class="active">
                <font-awesome-icon icon="chart-bar"></font-awesome-icon>
            </router-link>
            <router-link to="/etudiants" tag="li" class="list-group-item cursor-pointer" exact-active-class="active">
                <font-awesome-icon icon="users"></font-awesome-icon>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MenuBar"
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer
    }

    .list-group-item {
        border: 0;
    }

    .left-nav {
        width: 120px
    }

    @media (max-width: 992px) {
        .left-nav {
            background-color: transparent !important;
            width: 100%;
            margin-bottom: 20px;
        }
    }
</style>


