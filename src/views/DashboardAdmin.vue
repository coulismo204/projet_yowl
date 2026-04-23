<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import api from '@/api'
  import router from '@/router'

  const controlAdmin = ref(false)
  const userId = ref(null)
  const totalUsers = ref(null)
  const totalPosts =ref(null)
  const totalComments = ref(null)
  const userRepondants =ref(0)
  const maintenant = new Date()
  const croissanceUsers = ref(0)


  let allpost = ref()
  const url = ref()
  const title = ref()
  const content = ref()
  const date = ref()
  let allposter = ref([])
  let eachUser = ref([])




  async function Userinfo() {
    try {
      const user = await api.get('/user/profile')
      controlAdmin.value = user.data.data.admin
      userId.value = user.data.data.id
      if (!user.data.data.id ) {
        router.push('/login')
      }else if(user.data.data.id && Number(controlAdmin.value) !== 1){
        router.push('/dashboardUsers')
      }
      else{
        console.log('Accès autorisé')
      }
      
    } catch (error) {
      router.push('/login')
    }
  }

async function CountAllUsers() {
  const allusers = await api.get('/admin/')
  eachUser.value = allusers.data.data
  totalUsers.value = allusers.data.data.length
}

async function CounAllposts() {
  const allposts = await api.get('/post')
  totalPosts.value = allposts.data.data.length

}
 
async function CountAllcomments() {
  const allcomments = await api.get('/comment')
  totalComments.value = allcomments.data.data.length
}


async function home() {
  const response = await api.get('/post');
  var reponses = response.data;
  allposter.value = await response.data.data
}

async function tauxUtilisateursRepond() {
  const userrepondants = await api.get('/comment')
  const tempspasse =new Date(maintenant.getTime() - 30*24*60*60*1000)
  const commentairesRecents = userrepondants.data.data.filter(c => new Date(c.created_at) >= tempspasse)
  const uniqueUsers = new Set(commentairesRecents.map(c => c.user_id))
    userRepondants.value = uniqueUsers.size
}

async function tauxCroissanceUsers() {
  const users = await api.get('/UserComment')
  const usersGet = users.data.data

  const maintenant = new Date()
  const debutMoisActuel = new Date(maintenant.getFullYear(), maintenant.getMonth(), 1)
  const debutMoisPrecedent = new Date(maintenant.getFullYear(), maintenant.getMonth() - 1, 1)

  const usersCeMois = usersGet.filter(u => new Date(u.created_at) >= debutMoisActuel).length
  const usersMoisPrecedent = usersGet.filter(u => {
    const d = new Date(u.created_at)
    return d >= debutMoisPrecedent && d < debutMoisActuel
  }).length

  croissanceUsers.value = usersMoisPrecedent === 0 ? '0.00' : (((usersCeMois - usersMoisPrecedent) / usersMoisPrecedent) * 100).toFixed(2)
}



  async function deleteAccount(id) {
    if (confirm('Votre compte va être supprimer definitivement')) {
      await api.delete(`user/delete/${id}`)
      localStorage.removeItem('token')
    }
  }

  async function deletePost(id) {
    if (confirm('Le post va être supprimer definitivement')) {
      await api.delete(`post/delete/${id}`)
      await home()
      await CounAllposts()
      
    }
  }


onMounted(()=>{

  Userinfo()
  CountAllUsers()
  CounAllposts()
  CountAllcomments()
  tauxUtilisateursRepond()
  tauxCroissanceUsers()
  home()
  })

const tauxUsersRepondants = computed(() => {
  if (!totalUsers.value || totalUsers.value == 0) return '0.00'
  return ((userRepondants.value / Number(totalUsers.value)) * 100).toFixed(2)
})

  const tauxParticipations = computed(()=>{
    if (!totalUsers.value || totalUsers.value === 0) return '0.00'
  return ((Number(totalPosts.value) / Number(totalUsers.value)) * 100).toFixed(2)
})

const tauxReponses = computed(()=>{
  if (!totalPosts.value || totalPosts.value === 0) return '0.00'
  return (Number(totalComments.value) / Number(totalPosts.value) * 100).toFixed(2)
})

const commentairesParUser = computed(() => {
  if (!totalUsers.value || totalUsers.value == 0) return '0.00'
  return (Number(totalComments.value) / Number(totalUsers.value)).toFixed(2)
})

</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div class="bg-red-500 text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">Total Users</p>
          <h2 class="text-3xl font-bold mt-1">{{ totalUsers }}</h2>
        </div>
      </div>

      <div class="bg-blue-500 text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">Total des Posts</p>
          <h2 class="text-3xl font-bold mt-1">{{ totalPosts }}</h2>
        </div>
      </div>

      <div class="bg-green-500 text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">Total des Commentaires</p>
          <h2 class="text-3xl font-bold mt-1">{{ totalComments }}</h2>
        </div>
      </div>

      <div class="bg-yellow-500 text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold mt-1">Tableau de Bord Admin</h2>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-2xl shadow-sm p-5">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Utilisateurs</h3>

        <!-- Liste des utilisateurs -->
        <div class="overflow-y-auto max-h-56 space-y-2 pr-1">
          <div v-for="val1 in eachUser" :key="val1?.id" class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
            <!-- Nom + Avatar -->
            <div class="flex items-center gap-3 flex-1">
              <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                {{ val1?.id }}
              </div>
              <p class="text-sm font-semibold text-gray-800">{{ val1?.name }}</p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <!-- Bouton Admin -->
              <button class="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer">
                Admin
              </button>
              <!-- Icône suppression -->
              <button @click="deleteAccount(val1?.id)" class="text-red-400 hover:text-red-600 transition p-1" title="Supprimer">
                <i class="pi pi-trash text-base"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm p-5">
        <h3 class="text-lg font-bold text-gray-800 mb-4">View All Posts</h3>

        <div class="space-y-1">
          <div v-for="val in allposter" :key="val?.id" class="flex items-start justify-between p-3 rounded-xl hover:bg-gray-50 transition">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 font-bold text-sm shrink-0">{{ val?.user_id }}</div>
              <p class="text-xs text-gray-500 mt-0.5 line-clamp-2">{{ val?.title }}</p>
            </div>
            <span class="text-xs text-gray-400 whitespace-nowrap ml-3 mt-0.5">
              {{ val?.created_at?.slice(0, 10) }}        
              <button @click="deletePost(val?.id)" class="bg-red-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ml-2">
                Delete
              </button>
            </span>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-4">
          <button class="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition">
            <i class="pi pi-chevron-left text-xs"></i> Précédent
          </button>
          <span class="text-xs text-gray-400">Page 1 / 5</span>
          <button class="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition">
            Suivant <i class="pi pi-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
      <div class="bg-red-500 text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">Taux de participation</p>
          <h2 class="text-3xl font-bold mt-1">{{ tauxParticipations }}%</h2>
        </div>
      </div>

      <div class="bg-blue-500 text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">Taux de réponse</p>
          <h2 class="text-3xl font-bold mt-1">{{ tauxReponses }}%</h2>
        </div>
      </div>

      <div class="bg-green-500 text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">Taux d'Utilisateurs répondants</p>
          <h2 class="text-3xl font-bold mt-1">{{ tauxUsersRepondants }}%</h2>
        </div>
      </div>

      <div class="bg-yellow-500 text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">Croissance utilisateurs</p>
          <h2 class="text-3xl font-bold mt-1">{{ croissanceUsers }}%</h2>
        </div>
      </div>
      
      <div class="bg-[#f97316] text-white rounded-2xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">Commentaires / user</p>
          <h2 class="text-3xl font-bold mt-1">{{ commentairesParUser }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "primeicons/primeicons.css";
</style>