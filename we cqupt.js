let list = document.getElementsByClassName("van-field_control van-field_control--right");
list[0].value = 2021212400;
list[1].value = '吴家余';
list[2].value = '重庆市，重庆市，南岸区';
list[3].value = '崇文路';
list[4].value = '低风险';
list[5].value = '无';
list[6].value = '无';
list[7].value = '是';
list[8].value = '是';
list[9].value = '绿色';
let button = document.getElementsByTagName('button');
let number = 0;
setInterval(() => {
    for(let i=0;i<list.length;i++){
        if(list[i].length!=0){
            number++;
            continue;
        }
    }
    if(number>7) button.click();
}, 86400000);

