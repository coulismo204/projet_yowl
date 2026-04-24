<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import api from '@/api'

const route = useRoute()
const commentId = route.params.id
const AllPost =  ref([])
const url = ref("")
const title = ref("")
const content = ref("")
const userId = ref()
const datePost = ref()
const User = ref()
const comment = ref([])
const text = ref([])
const profileId = ref()

const controlAdmin = ref(false)



  async function Userinfo() {
    try {
      const user = await api.get('/user/profile')
      controlAdmin.value = user.data.data.admin
      userId.value = user.data.data.id
      if (!user.data.data.id) {
        router.push('/login')
      }else{
        console.log('Accès autorisé')
      }
      
    } catch (error) {
      router.push('/login')
    }

  }


async function get() {
    try {
        const response = await api.get('/post')
        AllPost.value = response.data.data
        
        AllPost.value.forEach(element => {
          if(element.id == commentId){
            url.value = element.url
            title.value = element.title
            content.value = element.content
            userId.value = element.user_id
            datePost.value = element.updated_at
          }
        });
    } catch (error) {
        console.error(error);
    }
}

async function getUser() {
    try {
        const response = await api.get('/UserComment')
        User.value = response.data.data
    } catch (error) {
        console.error(error);
    }
}

async function getComment() {
    try {
        const response = await api.get('/comment')
        response.data.data.forEach(element => {
          if(element.post_id == commentId){
            comment.value.push(element)
          }
        });
    } catch (error) {
        console.error(error);
    }
}

async function getprofile() {
    try {
        const response = await api.get('/user/profile')
        profileId.value = response.data.data.id
    } catch (error) {
        console.error(error);
    }
}
onMounted(()=>{
  get() 
  getUser()
  getComment() 
  getprofile() 
  })

async function submitReply() {
    const colis = {
    text: text.value,
    user_id : profileId.value,
    post_id : commentId
    }
    try {
        const response = await api.post('/comment/add',colis)
        if (response.status===200) {
            console.log('Commentaire envoyer avec succes', response.data)
            text.value = ""

        }else{
            console.log('Echec de l\'envoi')
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi de Commentaire : ', error);
    }

}

</script>

<template>
  <div class="details-page">
    <!-- NAVBAR YOWL -->
    <nav class="navbar">
      <div class="navbar-container">
        <RouterLink to="/" class="navbar-logo">
          YOW<span>L.CI</span>
        </RouterLink>
      </div>
    </nav>

    <!-- CONTENU PRINCIPAL -->
    <div class="details-content">
      <!-- Commentaire principal id parend -->
      <article class="main-comment card">
        <div class="media-container">
          <a :href="url" target="_blank" rel="noopener noreferrer" class="url-preview">
             {{ url }}
          </a>
        </div>
        <div class="comment-body">
          <h1 class="comment-title">{{ title }}</h1>
          <p class="comment-text">{{ content }}</p>
          <div class="comment-meta">
            <p>
              Publié par
              <span class="author" v-for="value in User" :key="value.id"><span v-if="value.id == userId"> {{ value.name }}</span></span>
            </p>
            
            <span class="date">{{ datePost?.slice(0,10) }}</span>
          </div>
        </div>
      </article>
            <!-- Christophe Voici la section commentaire dans commentaire faut mettre ta logique ici  -->
      <!-- Section des réponses -->
      <section class="replies-section">
        <h2 class="section-title">
          Réponses
          <span class="reply-count">{{ comment.length }}</span>
        </h2>

        <!-- Liste des réponses -->
        <div v-if="comment.length > 0" class="replies-list">
          <div v-for="reply in comment" :key="reply.id" class="reply-item card">
            <p class="reply-content">{{ reply.text }}</p>
            <div class="reply-meta">
              <p>
              Publié par
              <span class="author" v-for="value in User" :key="value.id"><span v-if="value.id == reply.user_id">{{ value.name }}</span></span>
            </p>
              <span class="reply-date">{{ reply.updated_at.slice(0,10) }}</span>
            </div>
          </div>
        </div>
        <div v-else class="no-replies card">
          <p>Aucune réponse pour le moment. Soyez le premier à répondre !</p>
        </div>

        <!-- Formulaire de réponse -->
        <form @submit.prevent="submitReply()" class="reply-form-simple">
        <textarea
            v-model="text"
            class="reply-textarea"
            placeholder="Écrivez votre réponse..."
            rows="3"
            required
        ></textarea>
        <button type="submit" class="submit-btn" :disabled="text.length == 0">
            <span @click="Userinfo()">Répondre</span>
        </button>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/details.css';
</style>