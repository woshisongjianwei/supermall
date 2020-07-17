<template>
  <div class="detail-paraminfo">
    <div class="size">
      <p>{{paramInfo.rule.key}}</p>
      <table>
        <tr :key="index" v-for="(item,index) in paramInfo.rule.tables[0]">
          <td :key="indey" v-for="(iten,indey) in item">{{iten}}</td>
        </tr>
      </table>
    </div>
    <div class="param">
      <p>{{paramInfo.info.key}}</p>
      <table>
        <tr :key="index" v-for="(item,index) in paramInfo.info.set">
          <td class="param-key">{{item.key}}</td>
          <td class="param-value">{{item.value}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamInfo',
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-paraminfo {
  padding: 20px 10px 10px;
  box-shadow: 0px 2px 2px rgba(100, 100, 100, 0.1);
}
.detail-paraminfo table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin: 10px 0 20px;
}
.detail-paraminfo table td {
  height: 32px;
  border-bottom: 1px solid #f6f6f6;
}
.detail-paraminfo p {
  font-size: 18px;
  color: #333333;
}
.param-key {
  width: 100px;
}
.param-value {
  color: #ff5777;
}
</style>
