<template>
    <div id="pipes">
        <img :src="require('@/assets/image/pie_up.png')" title="01" alt="pipe" class="pip-up" :style="css01()" >
        <img :src="require('@/assets/image/pie_up.png')" title="02" alt="pipe" class="pip-up" :style="css02()" >
        <img :src="require('@/assets/image/pie_down.png')" title="03" alt="pipe" class="pip-down" :style="css03()" >
        <img :src="require('@/assets/image/pie_down.png')" title="04" alt="pipe" class="pip-down" :style="css04()" >
    </div>
</template>

<script>
    export default {
        data: ()=>({
            w: 365,         // #app 的宽度
            pipe_w: 52,     // 管道 的宽度
            pipe_h: 400,    // 管道的高度
            left01: 0,      // 第一列管道的left值
            left02: 0,      // 第一列管道的left值
            top: -250,      // top01,top02,以这个高度为基准点随机加个数, top03, top04由top01,top02,决定
            top01: -250,    // 第一列上top值
            top02: -250,    // 第二列上top值
            can_add01: true,// 第一列管道是否可以加分, 如果已经加过了就false
            can_add02: true,// 第二列管道是否可以加分, 如果已经加过了就false
            spacing: 150,   // 上下管道的间距  
        }),
        computed: {
            top03() {
                return this.top01 + this.pipe_h + this.spacing
            },
            top04() {
                return this.top02 + this.pipe_h + this.spacing
            },
        },
        methods: {
            // 动态控制css==================================================================================
            css01() {
                return {
                    left: `${this.left01}px`,
                    top: `${this.top01}px`
                }
            },
            css02() {
                return {
                    left: `${this.left02}px`,
                    top: `${this.top02}px`
                }
            },
            css03() {
                return {
                    left: `${this.left01}px`,
                    top: `${this.top03}px`
                }
            },
            css04() {
                return {
                    left: `${this.left02}px`,
                    top: `${this.top04}px`
                }
            },
            // 数据更新==============================================================================
            // 管道数据初始化
            init() {
                let app = document.getElementById('app').getBoundingClientRect()
                this.w = app.width // #app 的宽度
                this.left01 = this.w
                this.left02 = this.w + this.w/2
                this.top = app.height<680?-300:-250
                this.top01 = this.top
                this.top02 = this.top
            },
            // 场景二管道数据更新
            updata() {
                this.left01-=3
                this.left02-=3
                if(this.left01<-this.pipe_w) {
                    this.left01=this.w
                    this.top01 = this.radom()
                    this.can_add01 = true
                }
                if(this.left02<-this.pipe_w) {
                    this.left02=this.w
                    this.top02 = this.radom()
                    this.can_add02 = true
                }
            },
            // 随机设置管道高度
            radom() {
                let {top} = this
                let height = document.getElementById('app').getBoundingClientRect().height
                // 如果高度大于750随机浮动值就大一点
                let num = height>750?parseInt(Math.random()*200)+top:parseInt(Math.random()*100)+top
                return num
            },
            // 获取pipes的数据 (用于管道碰撞)
            get_data() {
                let {top01, top02, top03, top04, left01, left02} = this
                let arr = [top01, top02, top03, top04]
                return arr.map((item, index)=>({
                    top: item,
                    bottom: item+400,
                    left: index+1===1||index+1===3?left01:left02,
                    right: index+1===1||index+1===3?left01+50:left02+50,
                }))
            },
            // 获取pipes的数据 (用于加分)
            get_data02() {
                let {left01, left02, pipe_w, can_add01, can_add02} = this
                return [
                    {right: left01+pipe_w, can_add: can_add01, name: 'can_add01'},
                    {right: left02+pipe_w, can_add: can_add02, name: 'can_add02'}
                ]
            },
            // 将某列管道设置为不可加分
            add_false(name) {
                this[name] = false
            }
            
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
.pip-up {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    user-select: none;
}
.pip-down {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    user-select: none;
}
</style>