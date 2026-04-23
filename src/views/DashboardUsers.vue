  <script setup>
  import { computed, onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import api from '@/api'
  import router from '@/router'

  const nom = ref(null)
  const email = ref(null)
  const birthdate = ref(null)
  const image = ref(null)
  const userId = ref(null)
  const allcomment = ref(null)
  let allpost  = ref(0)
  const post_info = ref(null)
  const modifPro = ref(false)


  const NewPassword = ref(null)
  const confirmNewPassword = ref(null)

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

  async function controladmin() {
    if (Number(controlAdmin.value) === 1) {
      controlAdmin.value = true
    }else{
      controlAdmin.value = false
    }
  }

  async function getuser() {
    const response = await api.get('/user/profile')
    const user = response.data.data
      nom.value = user.name
      email.value = user.email
      birthdate.value = user.birthdate
      userId.value = user.id
  }

  async function updateUserInfo() {
    const colis = {
      name : nom.value,
      email : email.value,
      image : image.value
    }
    try {
      const response =  await api.put('/user/update/'+userId.value,colis)
      if (response.status ===200) {
        alert('Vos Informations ont été mis à jour succès')
      }else{
        alert('Une erreur s\'est produite !')
      }
    } catch (error) {
      
    }
  }

  async function updateUserPassword() {
    const colis = {
      password : NewPassword.value,
      confirm_password : confirmNewPassword.value
    }
    try {
      const response =  await api.put('/user/updatePassword/'+userId.value,colis)
      if (response.status ===200) {
        alert('Vos Informations ont été mis à jour succès')
      }else{
        alert('Une erreur s\'est produite !')
      }
    } catch (error) {
      
    }
  }

  async function getcom() {
    const comment = await api.get('/comment/profile')
    const datas = comment.data
    allcomment.value = datas
  }

  async function getpost() {
    const comment = await api.get('/post/')
    post_info.value = comment.data.data
  }

  async function countPost() {
    const postuser = await api.get(`/post/profile`)
    allpost.value = postuser.data
  }
  async function logout() {
    await api.get('/user/disconnect')
    localStorage.removeItem('token')
    router.push('/login')
  }

  async function deleteAccount() {
    if (confirm('Votre compte va être supprimer definitivement')) {
      await api.delete(`user/delete/${userId.value}`)
      localStorage.removeItem('token')
      router.push('/register')
    }
  }

  async function deletePost(id) {
    if (confirm('Le post va être supprimer definitivement')) {
      await api.delete(`post/delete/${id}`)
      await getpost()
      await countPost()
      
    }
  }


const all = computed(() => (Number(allcomment.value) || 0) + allpost.value)

 const stat = computed(() => {
  if (allpost.value === 0) return 0
  return ((all.value / allpost.value) * 100).toFixed(2)
  })

  onMounted(() => {
    getuser()
    getcom()
    getpost()
    Userinfo()
    controladmin()
    countPost()
    })

  const menuOpen = ref(false)
  </script>

  <template>
    <div class="dashboard-page">
      <nav class="navbar">
        <div class="navbar-container">
          <RouterLink to="/" class="navbar-logo">Espace<span> Privé</span></RouterLink>
          </div>
      </nav>

      <!-- CONTENU PRINCIPAL DU DASHBOARD -->
      <div class="dashboard-content">
        <aside class="dashboard-sidebar">
          <div class="sidebar-card">
            <RouterLink to="/addcom" class="sidebar-link">
              <i class="fi fi-rr-comment-plus"></i> Ajouter un commentaire
            </RouterLink>
            <a @click.prevent="modifPro = !modifPro" href="#" class="sidebar-link">
              <i class="fi fi-ss-user-pen"></i>Modifier profile 
            </a>             
            <!-- admin -->
            <RouterLink v-if="controlAdmin == true" to="/dashboardadmin" class="sidebar-link">
              <i class="fi fi-rr-comment-plus"></i> Admin
            </RouterLink>         
            <a @click.prevent="logout" href="#" class="sidebar-link">
              <i class="fi fi-rr-sign-out-alt"></i> Déconnexion 
            </a>
            <a @click.prevent="deleteAccount" href="#" class="sidebar-link sidebar-link--danger">
              <i class="fi fi-rr-user-remove"></i> Supprimer le compte
            </a>
          </div>
        </aside>

        <!-- Zone principale -->
        <main class="dashboard-main">

          <div class="dashboard-row">
            <div class="profile-card card">
              <p class="card-label">Profil</p>

              <!-- affichage standard des infos du user -->

              <div v-if="!modifPro">
                <p><strong>Nom : </strong>{{ nom }}</p>
                <p><strong>E-mail : </strong>{{ email }}</p>
                <p><strong>Birthdate : </strong>{{ birthdate }}</p>
              </div>

                <!-- affichage quand on clique sur profile  -->

              <div v-if="modifPro" class="input-group">
                <label>Name</label>
                <input v-model="nom" type="email" placeholder="name" />
              </div>

              <!-- <div v-if="modifPro" class="input-group">
                <label>Image</label>
                <input type="file" @change="handleImageUpload" accept="image/*" v-on ="Image"/>
              </div > -->

              <div v-if="modifPro" class="input-group">
                <label>Adresse Email</label>
                <input v-model="email" type="email" placeholder="ton.email@exemple.com" />
              </div>

              <button v-if="modifPro" @click="updateUserInfo()" type="submit" class="btn">
                modifier
              </button>

              <div v-if="modifPro" class="input-group">
                <label>Nouveau mot de passe </label>
                <input v-model="NewPassword" type="password" placeholder="••••••••" />
              </div>

              <div v-if="modifPro" class="input-group">
                <label>confirmation du mot de passe  </label>
                <input v-model="confirmNewPassword" type="password" placeholder="••••••••" />
              </div>

              <button v-if="modifPro" @click="updateUserPassword()" type="submit" class="btn">
                modifier
              </button>
              
              
            </div>

            <div class="inbox-card card">
              <p class="card-label">commentaires</p>
              <h3 class="card-value">{{ allcomment }}</h3>
              <p class="card-sub">Reçus</p>
              <p>L'avis des Autres compte</p>
            </div>
          </div>

          <div class="dashboard-row stats-row">
            <div class="stat-card card">
              <p class="stat-label">Total des publications</p>
              <h4 class="stat-number">{{ allpost }}</h4>
            </div>
            <div class="stat-card card">
              <p class="stat-label">Total des messages</p>
              <h4 class="stat-number">{{ allcomment }}</h4>
            </div>
            <div class="stat-card card">
              <p class="stat-label">Activité du mois</p>
              <h4 class="stat-number">{{ stat }}%</h4>
            </div>
          </div>
            <div class="stat-card card">
              <p class="stat-label">Vos posts en détails</p>
              <div v-for="value in post_info"  class="stat-number">
                    <p v-if="value.user_id == userId">
                      {{ value.title }}  | <i @click="deletePost(value.id)" class="pi pi-trash" style="font-size: 1.3rem; color: red; cursor: pointer;"></i>
                    </p>
              </div>
              
              
            </div>
        </main>
      </div>
    </div>
  </template>

  <style scoped>
  @import '../assets/dashboarduser.css';
  @import "primeicons/primeicons.css";
  </style>