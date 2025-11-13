<template>
  <Transition name="fade">
    <div 
      v-if="modelValue" 
      class="pop__up-container"
      @click.self="closePopup"
    >
      <Transition name="slide-up">
        <div 
          v-if="modelValue"
          class="pop__up-content"
        >
          <button 
            v-if="showClose"
            @click="closePopup" 
            class="popup__close"
            type="button"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <slot />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watchEffect, onUnmounted, computed } from "vue";

interface Props {
  modelValue: boolean;
  showClose?: boolean;
  closeOnOverlay?: boolean;
  noPadding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  showClose: true,
  closeOnOverlay: true,
  noPadding: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const closePopup = () => {
  if (props.closeOnOverlay) {
    emit('update:modelValue', false);
  }
};

watchEffect(() => {
  if (props.modelValue) {
    document.body.classList.add('popup__open');
  } else {
    document.body.classList.remove('popup__open');
  }
});

onUnmounted(() => {
  document.body.classList.remove('popup__open');
});
</script>

<style scoped>
.pop__up-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000050;
  z-index: 80;
}

.pop__up-content {
  position: relative;
  max-width: 80%;
  width: fit-content;
  max-width: 1000px;
  background: #FFF;
  border-radius: 8px;
  padding: 25px;
  max-height: 80vh;
}

.pop__up-content--full {
  max-width: 95%;
  max-height: 95vh;
}

.pop__up-content--no-padding {
  padding: 0;
}

.popup__close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  font-size: 18px;
  color: #666;
}

.popup__close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #000;
  transform: rotate(90deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

@media (max-width: 768px) {
  .pop__up-container {
    align-items: center;
  }

  .pop__up-content {
    position: relative;
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    max-height: 80vh;
  }

  .popup__close {
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
  }
}
</style>

<style>
.popup__open {
  overflow: hidden;
}
</style>