<template>
    <div class="t-good-item" @touchstart="skipToDetail">
        <img :src="$img.imgBaseUrl+good.img" :alt="good.name">
        <div class="desc" v-text="good.desc"></div>
        <div>
            ￥<span v-text="good.price"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            good: {
                type: Object,
                required: false,
                default: function(){
                    return {}
                }
            }
        },
        methods: {
            skipToDetail(){
                this.$router.push('/good/detail/'+this.good._id)
            }
        }
    }
</script>

<style lang="scss" scoped>
.t-good-item{
    font-size: 0.37rem;
    background: white;
    padding: 0.133333rem .2rem;
    margin:  0.13rem ;
    border-radius: 0.133333rem;
    img {
        display: block;
        width: 100%;
        height: 3.73rem;
        margin: 0 auto;
    }
    .desc{
        line-break: 0.6rem;
    }
}

</style>