<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import { login, register } from '@/routes';
// import { }

const isMobileMenuOpen = ref(false)

</script>

<template>
    <nav class="navbar">
        <div class="navbar-container">
        <Link href="/" class="navbar-brand">
            YOWL.CI
        </Link>

        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="navbar-toggle">
            ☰
        </button>

        <ul :class="['navbar-menu', { open: isMobileMenuOpen }]">
            <li>
            <Link href="/" @click="isMobileMenuOpen = false">
                <div class="addCom">
                    Add Comment +
                </div>
                </Link>
            </li>
            <li class="inscription">
            <Link :href="login()" @click="isMobileMenuOpen = false">
                SIGN IN
            </Link>
            </li>
            <li class="connexion">
            <Link :href="register()" @click="isMobileMenuOpen = false">
                SIGN UP
            </Link>
            </li>
        </ul>
        </div>
    </nav>
    <div  class="navland">
                <br><br>
        <div class="welcome">
            <h1>BIENVENUE SUR YOWL COTE D’IVOIRE !</h1>
        </div>
            <br><br>
        <form class="search" action="#" method="GET">
            <input type="text" name="q" placeholder="Quel objet voulez vous .... ? "> <button type="submit">Decrouvrir</button>
        </form>
        <P class="recent" >Les commentaires les plus recents</P>
        <div class="All-Comments">
            <div class="logo">
                <!-- ici on mettra la logique pour afficher le logo ou l'image -->
                 <!-- <img src="../../css/logo.webp" alt=""> -->
                 <iframe class="responsive-iframe" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
           </div>
            <div class="details-comment">
                <p class="titre">Le Piege de la réussite financière</p><br>
                <p class="content-comment ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem error, tempora quod accusantium perferendis in. Tempore at dolorum iste libero delectus minima repellat provident unde obcaecati. Quaerat molestias facilis sequi.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo sit esse porro assumenda fugiat saepe, maiores non voluptates consequatur nulla praesentium rem voluptatem distinctio ipsa tenetur quidem voluptas excepturi alias.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor aliquid, veniam qui quisquam consectetur natus maiores explicabo dicta optio? Natus sint id maxime dolorum unde corporis excepturi dicta pariatur eos?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolorum hic atque consectetur, commodi autem labore. Laudantium officia labore accusantium aut ex autem, mollitia neque deleniti animi ipsum culpa voluptatibus!
                </p>
                <p class="user-name">Publié par : Jean Pierre</p>
                <p class="date-publish">14 / 06 /2018</p>

            </div>

        </div>
    </div>

</template>

<style>
@import '../../css/homepage.css'
</style>
