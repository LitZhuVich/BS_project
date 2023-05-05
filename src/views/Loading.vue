<template>
  <transition name="fade">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <div v-if="text" class="loading-text">{{ text }}</div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps(["text", "loading"]);
</script>

<style scoped lang="scss">
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .loading-spinner {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: loading 0.8s infinite linear;
  }

  .loading-text {
    font-size: 20px;
    color: #000;
    margin-top: 15px;
  }
}
</style>
