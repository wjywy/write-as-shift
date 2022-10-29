// 创建棋子
let chess = document.querySelector('.checkerboard').querySelectorAll('div');
let buttonNumber = 2;
for (let i = 0; i < chess.length; i++) {
    chess[i].addEventListener('click', function () {
        let button = document.createElement('button');
        button.value = i+1;
        chess[i].appendChild(button);
        if (buttonNumber % 2 == 0) {
            button.className = 'buttonBlack';
        } else {
            button.className = 'buttonWhite';
        }
        buttonNumber++;
        button.onclick = examineCount();
    })
}

//判断是否有五颗连在一起的子
function examineCount() {
    let buttonList = document.getElementsByTagName('button');
    let count ;
    // alert(buttonList[0].backgroundColor);
    // alert(chess[0].querySelector('button').style.position);
    // alert(chess[0].querySelector('button').className==chess[14].querySelector('button').className);
    for (let i = 4; i < buttonList.length; i++) {
        for (let k = 0; k < 126; k++) {
            //横排五连
            if (buttonList[i - 4].className == buttonList[i - 3].className
                && buttonList[i - 3].className == buttonList[i - 2].className
                && buttonList[i - 2].className == buttonList[i-1].className
                && buttonList[i-1].className == buttonList[i].className) {
                let j = i - 4;
                for (let h = 0; h < 5; h++) {
                    buttonList[j + h].style.display = 'none';
                }
                alert(buttonList[i].className + '取得胜利');
                count = 'true';
                break;
                // 竖排五连,加null是为了确保此处div下有button
            } else if (chess[k].querySelector('button') != null && chess[k + 14].querySelector('button') != null
                && chess[k + 28].querySelector('button') != null && chess[k + 42].querySelector('button') != null
                && chess[k + 56].querySelector('button') != null
                && chess[k].querySelector('button').className == chess[k + 14].querySelector('button').className
                && chess[k + 14].querySelector('button').className == chess[k + 28].querySelector('button').className
                && chess[k + 28].querySelector('button').className == chess[k + 42].querySelector('button').className
                && chess[k + 42].querySelector('button').className == chess[k + 56].querySelector('button').className) {
                for (let h = k; h < 197; h += 14) {
                    if (chess[h].querySelector('button') != null) {
                        chess[h].querySelector('button').style.display = 'none';
                    }
                }
                alert(chess[k].querySelector('button').className + '取得胜利');
                count = 'true';
                break;
                //右斜五连
            }else if(chess[k].querySelector('button') != null && chess[k + 15].querySelector('button') != null
            && chess[k + 30].querySelector('button') != null && chess[k + 45].querySelector('button') != null
            && chess[k + 60].querySelector('button') != null
            && chess[k].querySelector('button').className == chess[k + 15].querySelector('button').className
            && chess[k + 15].querySelector('button').className == chess[k + 30].querySelector('button').className
            && chess[k + 30].querySelector('button').className == chess[k + 45].querySelector('button').className
            && chess[k + 45].querySelector('button').className == chess[k + 60].querySelector('button').className) {
            for (let h = k; h < 197; h+=15) {
                if (chess[h].querySelector('button') != null) {
                    chess[h].querySelector('button').style.display = 'none';
                }
            }
            alert(chess[k].querySelector('button').className + '取得胜利');
            count = 'true';
            break;
            // 左斜五连
        }else if (chess[k].querySelector('button') != null && chess[k + 13].querySelector('button') != null
        && chess[k + 26].querySelector('button') != null && chess[k + 39].querySelector('button') != null
        && chess[k + 52].querySelector('button') != null
        && chess[k].querySelector('button').className == chess[k + 13].querySelector('button').className
        && chess[k + 13].querySelector('button').className == chess[k + 26].querySelector('button').className
        && chess[k + 26].querySelector('button').className == chess[k + 39].querySelector('button').className
        && chess[k + 39].querySelector('button').className == chess[k + 52].querySelector('button').className) {
        for (let h = k; h < 197; h+=13) {
            if (chess[h].querySelector('button') != null) {
                chess[h].querySelector('button').style.display = 'none';
            }
        }
        alert(chess[k].querySelector('button').className + '取得胜利');
        count = 'true';
        break;
    }else continue;
        }
        if(count=='true') {
            break;
        }
    }


    // if(chess[k].querySelector('button')!=null&&chess[k+14].querySelector('button')!=null
    // &&chess[k+28].querySelector('button')!=null&&chess[k+42].querySelector('button')!=null
    // &&chess[k+56].querySelector('button')!=null
    // &&chess[k].querySelector('button').className==chess[k+14].querySelector('button').className
    // &&chess[k+14].querySelector('button').className==chess[k+28].querySelector('button').className
    // &&chess[k+28].querySelector('button').className==chess[k+42].querySelector('button').className
    // &&chess[k+42].querySelector('button').className==chess[k+56].querySelector('button').className) {
    //     for(let h=k;h<197;h+=14) {
    //         if(chess[h].querySelector('button')!=null) {
    //         chess[h].querySelector('button').style.display='none';
    //     }
    // }
    //     alert(chess[k].querySelector('button').className+'取得胜利');
    // }else continue;

    // else if() {

    // }
    //     else {
    //         continue;
    //    } 

}

// let buttonList = document.getElementsByTagName('button');
// let number = 2;
// for (let i = 0; i < buttonList.length; i++) {
//     //单击固定
//     buttonList[i].addEventListener('click', function () {
//         buttonList[i].classList.add('buttonHover');
//         // 再次点击移除
//         if (number % 2 != 0) {
//             buttonList[i].classList.remove('buttonHover');
//         }
//         number++;
//     })
// }


// 消息是否显示
let count = 1;
function show() {
    count++;
    if (count % 2 == 0) {
        document.getElementById('word').classList.add('gone');
    } else {
        document.getElementById('word').classList.remove('gone');
    }
}
// 点击消息把消息移到发送框里去
let message = document.getElementsByTagName('p');
for (let i = 0; i < message.length; i++) {
    message[i].addEventListener('click', function () {
        document.getElementById('commentMessage').value = message[i].innerHTML;
    })
}
// 把发送框里的消息点击发送到专门的评论区,要动态创建盒子
function sendMessage() {
    let newP = document.createElement('div');
    document.getElementById('receiveMessage').appendChild(newP);
    newP.innerHTML = document.getElementById('commentMessage').value;;
    newP.classList.add('commentSectionMessageColor');
}

// // 拖动棋子   吃子
// let divList = document.querySelector('.checkerboard').querySelectorAll('div');
// for(let i=0;i<buttonList.length;i++) {
//     buttonList[i].id = 'addButtonId' + i;
//     buttonList[i].addEventListener('dragstart',function(event) {
//         event.dataTransfer.setData('Text',event.target.id)
//     })
//     for(let i = 0;i<divList.length;i++) {
//         divList[i].id = 'addDivId' + i;
//         divList[i].addEventListener('dragover', function(event) {
//             event.preventDefault();
//         });
//         divList[i].addEventListener('drop',function(event) {
//             event.preventDefault();
//             let id = event.dataTransfer.getData('Text');
//             event.target.appendChild(document.getElementById(id));
//         });
//     }
// }




