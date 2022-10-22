<script setup>
   const props = defineProps({
      title: {
         type: String,
         default: 'Fulan bin Fulan dan Fulanah binti Fulan'
      },
      value: {
         type: Number,
         default: 45
      },
      percent: {
         default: '45%'
      },
      bgColor: {
      	type: String,
      	default: 'bg-green-400'
      }
   })
</script>

<template>
   <div class="mb-3">
      <p class="mb-2">{{ props.title }}</p>
         <div>
             <div class="h-8 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
               <div 
               :class="bgColor"
               class="h-full grid place-items-center text-xs leading-none py-1 text-center text-white" 
               :style="{ width: value + '%' }">
                  {{ percent }}
               </div>
            </div>
         </div>
   </div>
</template>
