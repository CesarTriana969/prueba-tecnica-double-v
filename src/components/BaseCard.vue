<template>  
  <div class="base-card">
    <div class="base-card__header">
      <h5 class="base-card__title">{{ title }}</h5>
      <div class="base-card__icon" v-if="icon">
        <i :class="iconClass" :style="{color: iconColor, fontSize: iconSize}"></i>
      </div>
    </div>
    
    <p class="base-card__label">{{ label }}</p>
    
    <div class="base-card__footer">
      <h3 class="base-card__count">{{ formattedCount }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  count: number;
  label: string;
  icon?: boolean;
  iconClass?: string;
  iconColor?: string;
  iconSize?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: true,
  iconClass: 'fa-solid fa-users',
  iconColor: '#6366f1',
  iconSize: '24px'
});

const formattedCount = computed(() => {
  if (props.count === undefined || props.count === null) {
    return '0';
  }
  return props.count.toLocaleString('es-CO');
});
</script>

<style scoped>
.base-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  min-height: 180px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  transition: all 0.3s ease;
  max-width: 384px;
}

.base-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.base-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.base-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.base-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  flex-shrink: 0;
}

.base-card__label {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  margin-top: 1rem;
}

.base-card__footer {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 1.5rem;
}

.base-card__count {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1;
}

@media (max-width: 768px) {
  .base-card {
    max-width: 100%;
    min-height: 160px;
  }

  .base-card__title {
    font-size: 1.1rem;
  }

  .base-card__count {
    font-size: 2rem;
  }

  .base-card__icon {
    width: 40px;
    height: 40px;
  }
}
</style>