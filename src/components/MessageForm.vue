<template>
    <div class="message-form ld-over">
        <small class="text-muted">@{{ user.username }}</small>
        <b-form @submit.prevent="onSubmit" class="ld-over" v-bind:class="{ running: sending }">
            <div class="ld ld-ring ld-spin"></div>
            <b-alert variant="danger" :show="hasError">{{ error }}</b-alert>
            <b-form-group>
                <b-form-input
                        id="message-input"
                        type="text"
                        v-model="message"
                        @input="isTyping"
                        placeholder="Enter Message"
                        autocomplete="off"
                        required
                >
                </b-form-input>
            </b-form-group>
            <div class="clearfix">
                <b-button
                        type="submit"
                        variant="primary"
                        class="float-right"
                >
                    Send
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';

    import { isTypying } from '../chatkit';
    import { HAS_ERROR, SEND_MESSAGE } from '../constants/functionNames';

    export default {
      name: 'MessageForm',
      data() {
        return {
          message: ''
        }
      },
      computed: {
        ...mapState(['user', 'sending', 'error', 'activeRoom']),
        ...mapGetters([HAS_ERROR])
      },
      methods: {
        ...mapActions([SEND_MESSAGE]),
        async onSubmit() {
            const result = await this[SEND_MESSAGE](this.message);
            if(result) {
              this.message = '';
            }
        },
        async isTyping() {
            await isTypying(this.activeRoom.id);
        }
      }
    }
</script>
