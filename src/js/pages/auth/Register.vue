<script setup lang="ts">

import { Form, Head } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import BlankLayout from '@/layouts/BlankLayout.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';


defineOptions({ layout: BlankLayout });
</script>

<template>
    <Head title="Register" />

    <div class="register-page">

        <!-- PARTIE GAUCHE : message de bienvenue -->
        <div class="register-left">
            <div class="register-welcome">
                <h1>Bienvenue sur <span>YOWL</span></h1>
                <p>Rejoins notre communauté et commence à partager dès aujourd'hui.</p>

                <div class="register-quote">
                    "La meilleure façon de commencer, c'est de s'inscrire."
                </div>
            </div>
        </div>

        <!-- PARTIE DROITE : formulaire -->
        <div class="register-right">
            <div class="register-form-container">
                <h2>Créer un compte</h2>
                <p class="register-subtitle">Remplis le formulaire pour rejoindre YOWL</p>

                <Form
                    v-bind="store.form()"
                    :reset-on-success="['password', 'password_confirmation']"
                    v-slot="{ errors, processing }"
                    class="register-form"
                >
                    <div class="form-group">
                        <Label for="name">Nom complet</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autofocus
                            :tabindex="1"
                            autocomplete="name"
                            name="name"
                            placeholder="Ton nom complet"
                        />
                        <InputError :message="errors.name" />
                    </div>

                    <div class="form-group">
                        <Label for="email">Adresse email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            :tabindex="2"
                            autocomplete="email"
                            name="email"
                            placeholder="email@exemple.com"
                        />
                        <InputError :message="errors.email" />
                    </div>

                    <div class="form-group">
                        <Label for="birthday">Date de naissance</Label>
                        <Input
                            id="birthday"
                            type="date"
                            required
                            :tabindex="3"
                            autocomplete="bday"
                            name="birthdate"
                        />
                        <InputError :message="errors.birthday" />
                    </div>

                    <div class="form-group">
                        <Label for="password">Mot de passe</Label>
                        <PasswordInput
                            id="password"
                            required
                            :tabindex="4"
                            autocomplete="new-password"
                            name="password"
                            placeholder="Mot de passe"
                        />
                        <InputError :message="errors.password" />
                    </div>

                    <div class="form-group">
                        <Label for="password_confirmation">Confirmer le mot de passe</Label>
                        <PasswordInput
                            id="password_confirmation"
                            required
                            :tabindex="5"
                            autocomplete="new-password"
                            name="password_confirmation"
                            placeholder="Confirmer le mot de passe"
                        />
                        <InputError :message="errors.password_confirmation" />
                    </div>

                    <Button
                        type="submit"
                        class="register-btn"
                        tabindex="6"
                        :disabled="processing"
                    >
                        <Spinner v-if="processing" />
                        Créer mon compte
                    </Button>

                    <div class="register-login-link">
                        Déjà un compte ?
                        <TextLink class="color-grey" :href="login()" :tabindex="7">
                            Se connecter
                        </TextLink>
                    </div>
                </Form>
            </div>
        </div>

    </div>
</template>

<style scoped>
@import '../../../css/register.css';
</style>
