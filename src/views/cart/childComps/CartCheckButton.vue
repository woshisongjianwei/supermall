<template>
  <div @click="checkClick" class="cart-check">
    <i class="fa fa-check-circle check" v-if="ischeck"></i>
    <i class="fa fa-circle-o notcheck" v-else></i>
  </div>
</template>

<script>
export default {
  name: 'CartCheckButton',
  props: {
    ischeck: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    checkClick() {
      this.$emit('checkclick')
    }
  }
}
</script>

<style scoped>
.cart-check {
  width: 20px;
  text-align: center;
  vertical-align: middle;
}
.check {
  color: red;
}
.notcheck {
  color: #666666;
}
</style>
