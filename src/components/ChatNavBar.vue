<template>
    <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="#">
            Chat
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-text>{{ user.name }} | </b-nav-text>
            <b-nav-item href="#" active>Logout</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex';

    import { LOGIN, LOGOUT, SET_RECONNECT } from '../constants/functionNames'

    export default {
      name: 'ChatNavBar',
      computed: {
        ...mapState(['user', 'reconnect'])
      },
      methods: {
        ...mapActions([LOGIN, LOGOUT]),
        ...mapMutations([SET_RECONNECT]),
        onLogout() {
            this.$router.push({ path: '/' });
            this[LOGOUT]();
        },
        unload() {
            if(this.user.username) {
              this[SET_RECONNECT] = true;
            }
        }
      },
      mounted() {
        window.addEventListener('beforeunload', this.unload);
        if(this.reconnect) {
          this.login(this.user.username);
        }
      }
    }
</script>

<style>
    #chat-navbar {
        margin-bottom: 15px;
    }
</style>
