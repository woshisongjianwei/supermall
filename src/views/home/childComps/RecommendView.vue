<template>
  <div id="recommend">
    <a :href="item.link" :key="index" v-for="(item,index) in recommends">
      <img :src="item.image" alt />
      <p>{{item.title}}</p>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
#recommend {
  display: flex;
  flex-direction: row;
  padding: 10px 0 30px;
  border-bottom: 8px solid #eeeeee;
}
#recommend a {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #666666;
  text-decoration: none;
}
#recommend img {
  width: 90%;
  margin-bottom: 8px;
}
</style>
