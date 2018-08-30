<script>
import { get } from './util.js'
export default {
  async created () {
    const res = await get('/weapp/demo')
    console.log(123, res)
    console.log('小程序启动')
  }
}
</script>

<style></style>
