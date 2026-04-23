<script setup>
import api from '@/api';
import { onMounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref } from 'vue';

let allpost = ref()
const url = ref()
const title = ref()
const content = ref()
const userId = ref()
const date = ref()
const route = useRoute()
const q =ref()


async function home() {
  const search = q
  if (!search.value) {
  const response = await api.get('/post');
  allpost.value = await response.data.data  
  }else{
    const response = await api.get('/post/search/'+ q.value)
    allpost.value = response.data.data
  }
}

onMounted(() => {
  home();
});
</script>
 
<template>
  <div class="page">
 
  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="navbar-logo">
        YOW<span>L.CI</span>
      </RouterLink>
 
      <!-- Bouton hamburger mobile -->
      <button class="navbar-toggle" @click="menuOpen = !menuOpen" aria-label="Menu">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
        </svg>
      </button>
 
      <!-- Menu desktop -->
      <ul class="navbar-menu" :class="{ open: menuOpen }">
        <li>
          <RouterLink to="/addcom" class="btn btn-primary">
            + Ajouter un commentaire
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/login" class="btn btn-ghost">SIGN IN</RouterLink>
        </li>
        <li>
          <RouterLink to="/register" class="btn btn-ghost">SIGN UP</RouterLink>
        </li>
        <li>
          <RouterLink to="/dashboardusers" class="navbar-avatar-link">
            <img src="https://i.pravatar.cc/80?img=47" alt="Mon profil" class="navbar-avatar"/>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
 
  <!-- bienvenue -->
  <section class="bienvenue">
    <div class="bienvenue-content">
      <h1 class="bienvenue-title">
        Bienvenue sur<br>
        <span class="bienvenue-brand">YOWL</span> Côte d'Ivoire !
      </h1>
      <p class="bienvenue-subtitle">
        Découvrez les meilleurs avis et commentaires de votre communauté
      </p>
 
      <!-- BARRE DE RECHERCHE -->
      <form class="search-bar"  @submit.prevent="home">
        <input type="text" v-model="q" placeholder="Quel objet vous intéresse ?"/>
        <button type="submit">Découvrir</button>
      </form>
    </div>
  </section>
 
  <!-- SECTION COMMENTAIRES -->
  <main class="main-content">
    <div class="section-header">
      <h2 class="section-title">Commentaires récents</h2>
      <div class="section-line"></div>
    </div>
 
    <!-- CARTE COMMENTAIRE -->
    <article v-for="val in allpost " class="comment-card">
      <!-- la partir ou on doit injsecter l'url -->
      <div class="url">
        <embed type="video/webm" src="{{ val?.url }}" ></embed >
      </div>
 
      <!-- Contenu -->
      <div class="card-body"> 
        <h3 class="card-title">{{ val?.title }}</h3>
 
        <p class="card-text">{{ val?.content }}</p>
 
        <div class="card-footer">
            <div class="author-info">
              <span class="author-name">{{ val?.ComId  }}</span>
              <span class="author-date">{{ val?.created_at.slice(0, 10) }}</span>
            </div>
          </div>
          <!-- La route en commentaire est là pour pour orienté vers une page qui permet de voir les details et de repondre -->
          <!-- <RouterLink :to="'/details:id''"> --><RouterLink :to="'/details/' + val?.id"><button class="btn btn-read">Lire plus  . . .</button></RouterLink> <!--</RouterLink> -->
      </div>
    </article>
  </main>
 
  </div>
 
  <RouterView />
</template>
 
<script>
export default {
  data() {
    return {
      menuOpen: false,
    }
  }
}
</script>
 
 
<style>
@import '../assets/app.css';
</style>