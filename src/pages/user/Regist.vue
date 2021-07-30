<template>
    <div class="t-regist">
        <NavBar :title="'注册'"></NavBar>

        <van-form @submit="regist">
            <van-field
                v-model="user.username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="user.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-model="user.password2"
                type="password"
                name="密码"
                label="确认密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请确认密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                注册
                </van-button>
            </div>

            <div class="skipToLogin" @touchstart="skipToLogin">已有账号，点击登录</div>
        </van-form>
    </div>
</template>

<script>
import { NavBar } from '@/components/'
import { Form, Button, Field } from 'vant';
export default {
    components: {
        NavBar,
        [Form.name]: Form,
        [Button.name]: Button,
        [Field.name]: Field
    },
    data: function(){
        return {
            user: {
                username:'',
                password:'',
                password2: ''
            }
        }
    },
    methods: {
        regist(){
            console.log('user',this.user);
            this.$api.fetchRegist(this.user).then(()=>{
                // console.log('注册成功',res);
                this.$router.replace('/login')
            })
        },
        skipToLogin(){
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
.t-regist {
    margin-top: 1.333333rem;
    .skipToLogin {
        font-size: 0.4rem;
        color: #666666;
        text-align: center;
    }
}
</style>