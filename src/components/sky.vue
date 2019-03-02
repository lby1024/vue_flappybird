<template>
    <div id="sky">
        <img
            :style="css01()"
            :src="require('@/assets/image/background.png')" 
            alt="背景图sky">
        <img 
            :style="css02()"
            :src="require('@/assets/image/background.png')" 
            alt="背景图sky">
        <img 
            :style="css03()"
            :src="require('@/assets/image/background.png')" 
            alt="背景图sky">
    </div>
</template>

<script>
    export default {
        data: ()=>({
            x01: 0,
            x02: 600,
            x03: 1200,
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
                this.x01 -= 1
                this.x02 -= 1
                this.x03 -= 1
                if (this.x01<-600) this.x01=1119
                if (this.x02<-600) this.x02=1119
                if (this.x03<-600) this.x03=1119
            },
        }
    }
</script>

<style scoped>
    #sky{
        background-color: skyblue;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
    }
    img{
        display: block;
        height: 100%;
        width: 600px;
        position: absolute;
        top: 0px;
        pointer-events: none;
        user-select: none;
    }
</style>