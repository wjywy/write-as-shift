let selfId = [];
window.onload = function Load() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/toplist/detail',  //数据地址
        data: '',
        dataType: 'json',
        success: function (res) {
            // let resText = JSON.stringify(res);
            // let soaring = res.list[0].tracks;
            // let newSong = res.list[1].tracks;
            // let hotSong = res.list[3].tracks;
            // let original = res.list[2].tracks;
            // let bacimg = res.list[0].coverImgUrl;
            // let time = res.list[0].updateFrequency;
            // alert(bacimg);


            for (let p = 0; p < res.list.length; p++) {
                selfId[p] = res.list[p].id;
            }


            for (let i = 0; i < 4; i++) {
                let total = document.getElementById('totalBox');//创建总盒子
                total.classList.add('totalBox');
                let imgSong = document.createElement('div');
                total.appendChild(imgSong);
                let picture = document.createElement('img');//图片
                picture.src = res.list[i].coverImgUrl;
                imgSong.appendChild(picture);//放入大盒子
                picture.classList.add('pictureClass');   //添加样式
                imgSong.className = 'imgSongClass';   //添加样式
                let songBox = document.createElement('div');//装消息的盒子
                imgSong.appendChild(songBox);
                songBox.classList.add('songBox');
                // let time = document.createElement('p');//图片左下角de信息
                // time.innerHTML = res.list[i].updateFrequency;

                for (let k = 0; k < 3; k++) {
                    let n = k + 1;
                    let songAndAuthor = document.createElement('div');//歌曲名字与作者
                    songBox.appendChild(songAndAuthor);
                    songAndAuthor.innerHTML
                        =
                        n + '.' + res.list[i].tracks[k].first + '-' + res.list[i].tracks[k].second;
                    songAndAuthor.classList.add('songAndAuthor');
                }
            }
            // let test = soaring[0].first;
            // alert(test);

            let imgSongList = document.getElementsByClassName('imgSongClass');
            for (let m = 0; m < imgSongList.length; m++) {
                imgSongList[m].addEventListener('click', function () {
                    window.localStorage.indexId = selfId[m];
                    location.href = './songList.html';
                })
            }
        },
        error: function (err) {
            console.log('返回失败');
            console.log(err);
        }
    })
    return selfId;
}
let research = document.getElementById('research');
research.addEventListener('click', function () {
    window.location.href = './research.html';
})




// let imgSongList = document.getElementsByClassName('imgSongClass');
// for(let i=0;i<imgSongList.length;i++) {
//    imgSongList[i].id = selfId[i];
//    imgSongList[i].addEventListener('click',function() {
//     console.log(imgSongList.length);
//    })
// }

// document.getElementById('imgSong').addEventListener('click',function() {
//     for(let i=0;i<selfId.length;i++) {
//     let
//     alert(selfId);
// }
// })
