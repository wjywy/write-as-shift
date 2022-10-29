<template>
    <div id="register">
        //返回按钮
        <div class="delete">
            <div class="triangle"></div>
            <button @click="backDemo" class="back">返回</button>
        </div>
        <div class="registerDiv">
            //跳转到登录界面，表单在form中直接设置跳转
            <form action="#">
                <table>
                    <tr>
                        <div class="box">
                            <label for="user">用户名:</label>
                            <input type="text" id="user" @blur="checkName"><span id="userSpan"></span>
                        </div>
                    </tr>
                    <tr>
                        <div class="box">
                            <label for="password">密码:</label>
                            <input type="password" id="password" @blur="checkPassword">
                            <span id="passwordSpan"></span>
                        </div>
                    </tr>

                    <tr>
                        <div class="box">
                            <label for="password2">确认密码:</label>
                            <input type="password" id="password2" @blur="affirmPassword">
                            <span id="affirmPassword"></span>
                        </div>
                    </tr>
                    <tr>
                        <div class="box">
                            <label for="phonenumber">手机号码:</label>
                            <input type="text" id="phonenumber">
                            //disabled是禁用的意思，v-bind当值为为false时，则将元素隐藏
                            <button @click="timeDelete" :disabled="disable" id="codeBack">获取验证码</button>
                            <input type="button" @click="timeDelete" value="gettime"> {{gettime}}
                        </div>
                    </tr>
                    <tr>
                        <div class="box">
                            <label for="exem">验证码:</label>
                            <input type="text" id="exem" @blur="checkCode">
                            ///验证码
                            <button type="button" @click="changeCode">{{ code }}</button>
                            <button>点击验证</button>
                            <span id="checkCode"></span>
                        </div>
                    </tr>
                    <tr>
                        <div class="box">
                            <label for="yes">确认隐私条款:</label>
                            <input type="radio" id="yes" @click="affirmAgree">
                            <span id="affirm"></span>
                        </div>
                    </tr>
                    <tr>
                        <div class="box">
                            <button type="submit">点击提交</button>
                        </div>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: Math.floor(Math.random() * 9000 + 1000),
            disable: false,
            number: 60,
            gettime: '获取验证码'
        }
    },
  methods: {
        changeCode(code) {
            this.code = Math.floor(Math.random() * 9000 + 1000);
        },
        // 检测用户名是否为空
        checkName() {
            var name = document.getElementById("user").value;
            var span = document.getElementById("userSpan");
            if (name == null || name == "") {
                span.innerHTML = '此用户名为空';
                span.style.color = "red";
                return false;
            }
            else {
                span.innerHTML = '用户名格式正确';
                span.style.color = "green";
                return true;
            }
        },
        // 检测密码格式是否正确
        checkPassword() {
            var password = document.getElementById("password").value;
            var span = document.getElementById("passwordSpan");
            if (password.length < 4 || password.length > 12) {
                span.innerHTML = '密码位数不正确';
                span.style.color = 'red';
                return false;
            }
            else {
                span.innerHTML = '密码格式正确';
                span.style.color = 'green';
                return true;
            }
        },
        // 核验两次密码是否一致
        affirmPassword() {
            var password1 = document.getElementById("password").value;
            var password2 = document.getElementById("password2").value;
            var span = document.getElementById("affirmPassword");
            if (password1 == password2) {
                span.innerHTML = '确认密码成功';
                span.style.color = 'green';
                return true;
            }
            else {
                span.innerHTML = '两次密码不一致';
                span.style.color = 'red';
                return false;
            }
        },
        // 发送验证码后的倒计时效果
        timeDelete() {
            // setInterval中的第二个参数代表每隔多少毫秒就执行该函数；
            // clearInterval的意思是停止执行setInterval；
            var numberDown = setInterval(() => {
                if (this.number < 1) {
                    // this.disable = false;
                    this.number = 60;
                    this.disable = false;
                    clearInterval(numberDown);
                } else {
                    this.disable = true;
                    document.getElementById("codeBack").innerHTML = this.number-- + 's后发送';
                }
            }, 1000);
        },
        // 核验验证码是否相同
        checkCode() {
            var code1 = this.code;
            var code2 = document.getElementById("exem").value;
            var span = document.getElementById("checkCode");
            if (code1 == code2) {
                span.innerHTML = '验证码核验正确';
                span.style.color = 'green';
                return true;
            }
            else {
                span.innerHTML = '验证码核验失败';
                span.style.color = 'red';
                return false;
            }
        },
        // 是否勾选公司协议
        // 判断点击了几次，单数为勾选，偶数为未勾选
        affirmAgree() {
            var number = this.number++;
            var span = document.getElementById("affirm");
            if (number % 2 != 0) {
                span.innerHTML = '您已勾选';
                span.style.color = 'green';
                return ture;
            }
            else {
                span.innerHTML = '您还未勾选协议';
                span.style.color = 'red';
                return false;
            }
        },
        backDemo() {
            confirm('确认退出吗');
            window.location.href = 'index.html';
        }
    },
};

</script>

<style>
body {
    background-image: url(./src/assets/logo.png);
}

.delete {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.back {
    background-color: white;
    border: 0px;
}

.triangle {
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border: 10px solid transparent;
    border-left-color: pink;
}

label {
    width: 120px;
    display: flex;
    text-align: right;
}

.registerDiv {
    background-color: white;
    width: 300px;
    margin-left: 620px;
    margin-top: 200px;
}
</style>




    <!-- <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>register</title>
    </head>

    <body>
        <div id="register">
             //返回按钮 
            <div class="delete">
                <div class="triangle"></div>
                <button @click="backDemo" class="back">返回</button>
            </div>
            <div class="registerDiv">
                //跳转到登录界面，表单在form中直接设置跳转 
                <form action="#">
                    <table>
                        <tr>
                            <div class="box">
                                <label for="user">用户名:</label>
                                <input type="text" id="user" @blur="checkName"><span id="userSpan"></span>
                            </div>
                        </tr>
                        <tr>
                            <div class="box">
                                <label for="password">密码:</label>
                                <input type="password" id="password" @blur="checkPassword">
                                <span id="passwordSpan"></span>
                            </div>
                        </tr>

                        <tr>
                            <div class="box">
                                <label for="password2">确认密码:</label>
                                <input type="password" id="password2" @blur="affirmPassword">
                                <span id="affirmPassword"></span>
                            </div>
                        </tr>
                        <tr>
                            <div class="box">
                                <label for="phonenumber">手机号码:</label>
                                <input type="text" id="phonenumber">
                                 //disabled是禁用的意思，v-bind当值为为false时，则将元素隐藏 
                                <button @click="timeDelete" :disabled="disable" id="codeBack">获取验证码</button>
                                 <input type="button" @click="timeDelete">{{gettime}}</input> 
                            </div>
                        </tr>
                        <tr>
                            <div class="box">
                                <label for="exem">验证码:</label>
                                <input type="text" id="exem" @blur="checkCode">
                                ///验证码 
                                <button type="button" @click="changeCode">{{ code }}</button>
                                <button>点击验证</button>
                                <span id="checkCode"></span>
                            </div>
                        </tr>
                        <tr>
                            <div class="box">
                                <label for="yes">确认隐私条款:</label>
                                <input type="radio" id="yes" @click="affirmAgree">
                                <span id="affirm"></span>
                            </div>
                        </tr>
                        <tr>
                            <div class="box">
                                <button type="submit">点击提交</button>
                            </div>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
        <script src="../firstApp/node_modules/vue/dist/vue.js"></script>
        <script type="text/javascript">
            new Vue({
            el: '#register',
            data: {
                code: Math.floor(Math.random() * 9000 + 1000),
                disable:false,
                number:60,
                gettime:'获取验证码'
            },
            methods: {
                changeCode(code) {
                    this.code = Math.floor(Math.random() * 9000 + 1000)
                },
                // 检测用户名是否为空
                checkName(){
                    var name = document.getElementById("user").value;
                    var span = document.getElementById("userSpan");
                    if(name==null||name==""){
                        span.innerHTML='此用户名为空';
                        span.style.color = "red";
                        return false;
                    }
                    else{
                        span.innerHTML='用户名格式正确';
                        span.style.color="green";
                        return true;
                    }
                },
                // 检测密码格式是否正确
                checkPassword(){
                    var password = document.getElementById("password").value;
                    var span = document.getElementById("passwordSpan");
                    if(password.length<4||password.length>12){
                        span.innerHTML = '密码位数不正确';
                        span.style.color ='red';
                        return false;
                    }
                    else {
                        span.innerHTML = '密码格式正确';
                        span.style.color = 'green';
                        return true;
                    }
                },
                // 核验两次密码是否一致
                affirmPassword(){
                    var password1 = document.getElementById("password").value;
                    var password2 = document.getElementById("password2").value;
                    var span = document.getElementById("affirmPassword");
                    if(password1==password2){
                        span.innerHTML = '确认密码成功';
                        span.style.color = 'green';
                        return true;
                    }
                    else{
                        span.innerHTML = '两次密码不一致';
                        span.style.color = 'red';
                        return false;
                    }
                },
                // 发送验证码后的倒计时效果
                timeDelete(){
                    // setInterval中的第二个参数代表每隔多少毫秒就执行该函数；
                    // clearInterval的意思是停止执行setInterval；
                    var numberDown = setInterval(() => {
                        if(this.number < 1){
                            // this.disable = false;
                            this.number = 60;
                            this.disable=false;
                            clearInterval(numberDown);
                        }else{
                            this.disable = true;
                            document.getElementById("codeBack").innerHTML = this.number-- + 's后发送'
                        }
                    }, 1000);
                },
                // 核验验证码是否相同
                checkCode(){
                    var code1 = this.code;
                    var code2 = document.getElementById("exem").value;
                    var span = document.getElementById("checkCode");
                    if(code1==code2){
                        span.innerHTML = '验证码核验正确';
                        span.style.color = 'green';
                        return true;
                    }
                    else{
                        span.innerHTML = '验证码核验失败';
                        span.style.color = 'red';
                        return false;
                    }
                },
                // 是否勾选公司协议
                // 判断点击了几次，单数为勾选，偶数为未勾选
                affirmAgree(){
                    var number = this.number++;
                    var span = document.getElementById("affirm");
                    if(number%2!=0){
                        span.innerHTML = '您已勾选';
                        span.style.color = 'green';
                        return ture;
                    }
                    else{
                        span.innerHTML = '您还未勾选协议';
                        span.style.color = 'red';
                        return false;
                    }
                },
                backDemo(){
                    confirm('确认退出吗');
                    window.location.href = 'index.html';
                }
            },

        });
        </script>
    </body>
    <style>
        body {
            background-image: url(./src/assets/logo.png);
        }

        .delete {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }

        .back {
            background-color: white;
            border: 0px;
        }

        .triangle {
            width: 0;
            height: 0;
            line-height: 0;
            font-size: 0;
            border: 10px solid transparent;
            border-left-color: pink;
        }

        label {
            width: 120px;
            display: flex;
            text-align: right;
        }

        .registerDiv {
            background-color: white;
            width: 300px;
            margin-left: 620px;
            margin-top: 200px;
        }
    </style>

    </html> -->