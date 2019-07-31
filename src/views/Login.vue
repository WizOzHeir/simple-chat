<template>
    <div class="login">
        <b-jumbotron
                header="Cool chat"
                lead="Using Chatkit & Bootstrap-Vue"
                bg-variant="info"
                text-variant="white"
        >
            <p>Made by WizOzHeir for learning purpose.</p>
            <b-btn target="_blank" href="https://github.com/WizOzHeir">Github profile</b-btn>
        </b-jumbotron>
        <b-container>
            <b-row>
                <b-col md="4" lg="3"></b-col>
                <b-col md="4" lg="6">
                    <LoginForm />
                </b-col>
                <b-col md="4" lg="3"></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import LoginForm from '../components/LoginForm';

    export default {
        name: 'login',
        components: {
          LoginForm
        }
    }
</script>
