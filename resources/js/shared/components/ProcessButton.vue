<template>
    <button
      class="btn btn-secondary btn-block"
      @click="$parent.check"      
      :disabled="value"
    >
      <span v-if="!value"><slot></slot></span>
      <span v-if="value"><i class="fas fa-circle-notch fa-spin"></i> Checking...</span>      
    </button>
</template>

<script>
    export default {
        props:{
            value: Boolean,
        }
    }
</script>