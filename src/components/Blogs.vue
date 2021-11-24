<template>
  <div class="mcontet">
    <Header/>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top" v-for="blog in blogs" v-bind:key="blog.title">
          <el-card>
            <h4>
              <router-link :to="{name:'blogDetail', params:{blogId:blog.id}}">
                {{blog.title}}
              </router-link>
            </h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination class="mpage"
        background
        layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change="page"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Header from'./Header'

export default {
  name: "Blogs",
  components:{
    Header, //组件除了在子组件注册外还要在根Vue程序注册,

  },
  data(){
    return{
      blogs:{}.blogs,
      currentPage:1,
      total:0,
      pageSize:5
    }
  },
  methods:{
    page(currentPage){
      const that = this;
      that.$axios.get('/blogs?currentPage='+currentPage).then(res=>{
        that.blogs  = res.data.data.records
        that.currentPage = res.data.data.current
        that.total = res.data.data.total
        that.pageSize = res.data.data.size
      })
    }
  },
  created() {
    this.page(this.currentPage)
  }
}
</script>

<style scoped>
.mpage{
  margin: 0 auto;
  text-align: center;
}
</style>
