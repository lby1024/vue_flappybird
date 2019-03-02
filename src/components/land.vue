<template>
    <div id="land">
        <img
            :style="css01()"
            :src="require('@/assets/image/land.png')" 
            alt="背景图sky">
        <img 
            :style="css02()"
            :src="require('@/assets/image/land.png')" 
            alt="背景图sky">
        <img 
            :style="css03()"
            :src="require('@/assets/image/land.png')" 
            alt="背景图sky">
    </div>
</template>

<script>
    export default {
        data: ()=>({
            x01: 0,
            x02: 672,
            x03: 1344,
        }),
        methods: {
            css01() {
                let {x01} = this
                return { left: `${x01}px` }
            },
            css02() {
                let {x02} = this
                return { left: `${x02}px` }
            },
            css03() {
                let {x03} = this
                return { left: `${x03}px` }
            },
            updata() {
                this.x01 -= 3
                this.x02 -= 3
                this.x03 -= 3
                if (this.x01<-672) this.x01=1200
                if (this.x02<-672) this.x02=1200
                if (this.x03<-672) this.x03=1200
            }
        }
    }
</script>

<style scoped>
    #land{
        width: 100%;
        height: 122px;
        background-color:red;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 3;
        overflow: hidden;
    }
    img{
        display: block;
        width: 672px;
        height: 122px;
        position: absolute;
        bottom: 0;
        pointer-events: none;
        user-select: none;
    }
</style>