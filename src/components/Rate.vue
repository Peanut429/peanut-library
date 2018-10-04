<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <span class="hollow" :style="style">
      ★★★★★
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {
    style () {
      return `width: ${this.value / 2}em`
    }
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
@charset "utf-8";
.rate{
  position: relative;
  display: inline-block;
  .hollow {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
  }
}
</style>
