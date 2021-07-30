<template>
    <div class="t-login">
        <NavBar :title="'登录'"></NavBar>

        <van-form @submit="login">
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
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                提交
                </van-button>
            </div>

            <div class="regist" @click="skipToRegist">没有账号，立即注册</div>
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
                password:''
            }
        }
    },
    methods: {
        login(){
            console.log('提交表单');
            this.$api.fetchLogin(this.user).then(res=>{
                // console.log('登录成功',res);
                localStorage.setItem('token',res.token)
                this.$router.back()
            })
        },
        skipToRegist(){
            this.$router.push('/regist')
        }
    }
}
</script>

<style lang="scss" scoped>
.t-login{
    margin-top: 1.333333rem;

    .regist{
        text-align: center;
        color: #666666;
        font-size: 0.4rem;
    }
}
</style>