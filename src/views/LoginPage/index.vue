<template>
    <div class="loginBody">
        <div class="Login">
            <div class="box">
                <div class="table">登录界面</div>
                <div class="input">
                    <input type="text" placeholder="账号">
                    <input type="password" placeholder="密码">
                    <input type="password" placeholder="密码">

                    <button  class="go">登陆</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

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
        .box{
            width: 70%;
        }
        .table{
            width: 100%;
            text-align: center;
            font-size: 30px;
            font-family: "楷体";
            font-weight: 600;
            color: rgb(247, 132, 151);
        
        }
        .input{
            display: flex;
            flex-direction: column;
            align-items: center;
            .go{
                width: 90%;
                height: 40px;
                border-radius: 10px;
                margin-top: 20px;
                outline: none;
                border: none;
                color: white;
                font-size: larger;
                background-color: rgb(228, 211, 119);
                cursor: pointer;
            }
        }
        .input>input{
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