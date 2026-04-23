<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import api from '@/api';
import { useRouter } from 'vue-router';

const profileId = ref()
const title = ref('')
const url = ref('')
const content = ref('')
const router = useRouter()
const userId = ref()



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

const post = async () => {
    const colis = {
        title : title.value,
        url : url.value,
        content : content.value,
        user_id : profileId.value
    }
    try {
        const response = await api.post('/post/add',colis)
        if (response.status===200) {
            console.log('Enrégistrer avec succes !', response.data)
            title.value =""
            url.value =""
            content.value = ""
            router.push('/')

        }else{
            console.log('Création du poste réussi !')
        }
    } catch (error) {
        console.error('Erreur lors de la création du post', error);
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
  getprofile()
  Userinfo()
});

const validUrl = computed(() =>{
  const regexp = new RegExp("^((http|https)://)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|/|=|?)?]+)+$")
  if(regexp.test(url.value)){
    return false
  }else{
    return true
  }
})

</script>

<template>
  <section class="min-h-screen bg-[#0077CC] flex items-center justify-center px-4 py-12">
    <!-- Carte vitrée du formulaire -->
    <div class="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
      <!-- En-tête -->
      <h2 class="mb-2 text-3xl md:text-4xl font-bold text-center text-white" style="font-family: 'Syne', sans-serif;">
        Postez votre commentaire
      </h2>
      <p class="text-center text-white/80 mb-8 text-sm md:text-base" style="font-family: 'DM Sans', sans-serif;">
        Faites savoir au monde entier votre pensée sur ce contenu
      </p>

      <!-- Formulaire -->
      <form class="space-y-6" @submit.prevent="post()">
        <!-- Titre -->
        <div>
          <label for="titre" class="block mb-2 text-sm font-medium text-white/90" style="font-family: 'DM Sans', sans-serif;">
            Titre du commentaire
          </label>
          <input
            id="titre"
            type="text"
            v-model="title"
            class="w-full px-4 py-3 bg-white/15 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF7A35] focus:border-transparent transition"
            style="font-family: 'DM Sans', sans-serif;"
            placeholder="Exprimez l'idée principale..."
            required
          />
        </div>

        <!-- URL -->
        <div>
          <label for="url" class="block mb-2 text-sm font-medium text-white/90" style="font-family: 'DM Sans', sans-serif;">
            URL du contenu
          </label>
          <input id="url" type="url" v-model="url" class="w-full px-4 py-3 bg-white/15 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF7A35] focus:border-transparent transition" style="font-family: 'DM Sans', sans-serif;" placeholder="https://..." required/>
        </div>

        <!-- Commentaire -->
        <div>
          <label for="message" class="block mb-2 text-sm font-medium text-white/90" style="font-family: 'DM Sans', sans-serif;">
            Votre commentaire
          </label>
          <textarea
            id="message"
            rows="5"
            v-model="content"
            class="w-full px-4 py-3 bg-white/15 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF7A35] focus:border-transparent transition resize-y"
            style="font-family: 'DM Sans', sans-serif;"
            placeholder="Partagez votre avis en détail..."
            required
          ></textarea>
        </div>

        <!-- Bouton d'envoi -->
        <button :disabled="title.length < 0 || content.length < 0 || validUrl"
          type="submit"
          class="cursor-pointer w-full py-3.5 bg-[#FF7A35] hover:bg-[#e86820] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
          style="font-family: 'DM Sans', sans-serif;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span>Publier le commentaire</span>
        </button>
        <p class="text-center text-white/60 text-xs italic pt-2">NB : Faites attention a ce que vous dites cela pourrait être mal interpreter !</p>
      </form>
    </div>
  </section>
</template>



<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
</style>