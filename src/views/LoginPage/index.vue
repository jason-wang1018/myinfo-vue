<template>
    <div class="loginBody">
        <div class="Login">
            <div class="box">
                <div class="table">登录界面</div>
                <div class="input">
                    <input type="text" placeholder="账号" v-model="loginMsg.username">
                    <input type="password" placeholder="密码" v-model="loginMsg.password">
                    <div class="verificationCode">
                        <input type="password" placeholder="验证码" v-model="loginMsg.code">
                        <button @click="obtainVerificationCode" ref="btn">获取验证码</button>
                    </div>
                    <div class="rememberInput">
                        <label for="remember">
                            <input id="remember" type="checkbox">记住用户名和密码
                        </label>
                    </div>
                    <button class="go" @click="gotoIndex"  :disabled="lock">登陆</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive} from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@a/login'
import { ElMessage } from 'element-plus'
import userUserInfo from '@s/user'
const  UserInfoStore = userUserInfo()
const  Router=useRouter()

const lock=ref<boolean>(false)


const btn = ref<HTMLButtonElement>()

const obtainVerificationCode = () => {
    // 获取验证码 不可点击 显示60秒倒计时
    let time = 60
    const timer = setInterval(() => {
        time--
        if (time === 0) {
            clearInterval(timer)
            btn.value!.disabled = false
            btn.value!.innerText = '获取验证码'
        } else {
            btn.value!.disabled = true
            btn.value!.innerText = `${time}秒后重新获取`

        }
    }, 1000)
}

const loginMsg = reactive({
    username: '',
    password: '',
    code: '',
    id: 1
})

const gotoIndex = () => {
    lock.value=true
    if (loginMsg.username === '' || loginMsg.password == '' || loginMsg.code === '') {
        ElMessage({
            type:'error',
            message:'请填写完整信息',
            duration:1000,
            onClose:()=>{
                lock.value=false
            }
        })
    } else {
        loginMsg.username = loginMsg.username.trim()
        loginMsg.password = loginMsg.password.trim()
        loginMsg.code = loginMsg.code.trim()
        if (loginMsg.username === 'admin') {
            loginMsg.id = 1
        } else if (loginMsg.username === 'teacher') {
            loginMsg.id = 2
        } else {
            ElMessage({
            type:'error',
            message:'用户不存在,请检查是否写错!!1',
            duration:1000,
            onClose:()=>{
                lock.value=false
            }
        })
            return
        }
        login({ id: loginMsg.id }).then(res => {
            if (res.data.code == 200) {

                const { avatar } =res.data.data
                localStorage.setItem('avatar', avatar)
                UserInfoStore.avatar=avatar

                const { role } =res.data.data
                localStorage.setItem('role', role)
                UserInfoStore.role=role

                const { token } =res.data.data
                localStorage.setItem('token', token)
                UserInfoStore.token=token

                const {router} =res.data.data
                localStorage.setItem('router',JSON.stringify(router))
                UserInfoStore.router=JSON.parse(localStorage.getItem('router')!)

                const { username } = res.data.data
                localStorage.setItem('username', username)
                UserInfoStore.username=username
                ElMessage({
                    type:'success',
                    duration:2000,
                    message:'您已经登录成功啦!!',
                    onClose:()=>{
                        lock.value=false
                        Router.replace('/')
                    }
                })
            }
        })
    }
}

</script>

<style lang="less" scoped>
.loginBody {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #a29bfe;
    background-image: url();
    background-size: 100% 100%;

    .Login {
        width: 30vw;
        height: 50vh;
        display: flex;
        min-width: 400px;
        border-radius: 15px;
        background: linear-gradient(to right bottom,
                rgba(255, 255, 255, .7),
                rgba(255, 255, 255, .5),
                rgba(255, 255, 255, .4));
        /* 使背景模糊化 */
        backdrop-filter: blur(8px);
        flex-direction: column;
        box-shadow: 0 0 20px #a29bfe;
        align-items: center;
        padding: 20px;

        .box {
            width: 70%;
        }

        .table {
            width: 100%;
            text-align: center;
            font-size: 30px;
            font-family: "楷体";
            font-weight: 600;
            color: rgb(247, 132, 151);

        }

        .input {
            display: flex;
            flex-direction: column;
            align-items: center;

            label {
                height: 25px;
            }

            .rememberInput {
                align-self: flex-start;
                margin-top: 10px;
                color: #5a53be;
                display: flex;
                font-size: 15px;
                align-items: center;

                &>input {
                    width: 30px;
                    display: inline-block;
                    height: 15px;
                    margin-right: 5px;
                }
            }

            .go {
                width: 90%;
                height: 40px;
                border-radius: 10px;
                margin-top: 20px;
                outline: none;
                border: none;
                color: white;
                font-size: larger;
                background-color: rgb(153, 120, 207);
                cursor: pointer;
            }

            .verificationCode {
                width: 100%;
                text-align: left;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;

                &>input {
                    width: 60%;
                    height: 50px;
                    outline: none;
                    background-color: transparent;
                    border-bottom: 2px solid rgb(177, 123, 168);
                }

                &>button {
                    width: 35%;
                    height: 40px;
                    background-color: rgb(226, 201, 206);
                    outline: none;
                    border: 2px solid rgb(231, 214, 57);
                    color: white;
                }

            }
        }

        .input>input {
            width: 100%;
            height: 50px;
            margin: 10px;
            outline: none;
            background-color: transparent;
            border-bottom: 2px solid rgb(177, 123, 168);

        }

    }
}
</style>