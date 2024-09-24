<template>
 <h1 class="text-purple-600">Mon super test {{ dynamic }}</h1>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDYzMjlhZTNlNWU0NmMzZDEzODA3YTE5ZjVmNDdmNiIsIm5iZiI6MTcyNzE2MzA5MC44NjgzODYsInN1YiI6IjY2ZjI2OTY4MDIyMDhjNjdjODhkNjYwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Onn4uAaeTpmMAt62l3tgowwMkJseOLUfBmLzV3YtLNU'
  }
};

fetch('https://api.themoviedb.org/3/authentication', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

const dynamic = ref('variable');
</script>
