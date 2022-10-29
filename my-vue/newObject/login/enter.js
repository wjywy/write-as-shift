new Vue({
    el: '#enter',
    methods: {
        backDemo() {
            confirm('确认退出吗');
            window.location.href = 'index.html';
        }
    },
})
$("#submit1").click(function() {
    $.ajax({
        type:'get',
        url:'http://localhost:3000/enter',
        dataType:'json',
        data:{
            user:document.getElementById('enterDemo').value,
            password:document.getElementById('registerDemo').value
        },
        success:function(data) {
            console.log(data);
            window.location.href = ('../chineseChest/index.html');
        },
        error:function() {
            alert('密码或用户名出现错误')
        }
    })
})