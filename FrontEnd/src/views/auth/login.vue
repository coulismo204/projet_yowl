<script setup lang="ts">
import { ref } from 'vue';
import api from '@/api';
import { useRouter } from 'vue-router';

const email = ref();
const password = ref();
const router = useRouter()

async function post() {
    const colis = {
    email:email.value,
    password : password.value,
    }
    try {
        const response = await api.post('/login',colis)
        if (response.status===200) {
            console.log('connexion!', response.data)
            localStorage.setItem('token',response.data.token)
            email.value =""
            password.value = ""
            router.push("/")

        }else{
            console.log('Réfusé')
        }
    } catch (error) {
        console.error('Erreur lors de la connexion', error);
    }

}
</script>

<template>
  <div class="page">
    <div class="header">
      <span class="logo-white">YOW</span><span class="logo-orange">L.CI</span>
    </div>

    <div class="cadre">
      <h1 class="titre">Connexion</h1>
      <p class="sous-titre">Heureux de te revoir sur YOWL.</p>


      <form @submit.prevent="post()">
        <div class="input-group">
          <label>Adresse email</label>
          <input v-model="email" type="email" placeholder="ton.email@exemple.com" />
        </div>

        <div class="input-group">
          <label>Mot de passe</label>
          <input v-model="password" type="password" placeholder="••••••••" />
        </div>

        <button type="submit" class="btn">
          Se connecter →
        </button>
      </form>

  
      <p class="signup">
        Pas encore de compte ? <RouterLink to="/register">S'inscrire</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/login.css';
</style>
<style>

</style>