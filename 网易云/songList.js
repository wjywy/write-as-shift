let idList = window.localStorage.indexId;
// alert(typeof(idList));
let numberIdList = Number(idList);
// alert(numberIdList);
window.onload = function () {
    $.ajax({
        type: 'GET',
        data: {
            id: numberIdList
        },
        dataType: 'json',
        url: 'http://localhost:3000/playlist/detail',
        success: function (res) {
            console.log(res);

            document.getElementById('image1').addEventListener('click', function () {
                window.history.go(-1);
            });
            document.getElementById('image2').addEventListener('click', function () {
                window.location.href = './index.html'
            })

            // 歌单上方介绍
            let topBox = document.getElementById('topBox');//上方大盒


            let topBoxImgAndRight = document.createElement('div');
            topBox.appendChild(topBoxImgAndRight);
            topBoxImgAndRight.classList.add('topBoxImgRight');

            let topBoxImg = document.createElement('img');//什么榜图片
            topBoxImgAndRight.appendChild(topBoxImg);
            topBoxImg.src = res.playlist.coverImgUrl;
            topBoxImg.classList.add('topBoxImg');

            let topRightBox = document.createElement('div');//上右三件套
            topBoxImgAndRight.appendChild(topRightBox);
            topRightBox.classList.add('topRightBox');

            let topBoxBang = document.createElement('div')//什么榜
            topRightBox.appendChild(topBoxBang);
            topBoxBang.innerHTML = res.playlist.name;
            topBoxBang.classList.add('topBoxBang');

            let MusicAndName = document.createElement('div');
            topRightBox.appendChild(MusicAndName);
            MusicAndName.classList.add('MusicAndName');

            let WangyiLogo = document.createElement('img')//音乐图标
            MusicAndName.appendChild(WangyiLogo);
            WangyiLogo.src = '../assets/WangYiMusic.jpg';
            WangyiLogo.classList.add('WangYiMusic')

            let topBoxMusic = document.createElement('div');
            MusicAndName.appendChild(topBoxMusic);
            topBoxMusic.innerHTML = '网易云音乐';
            topBoxMusic.classList.add('topBoxMusic');

            let topBoxIntroduce = document.createElement('div');//榜单介绍
            topRightBox.appendChild(topBoxIntroduce);
            topBoxIntroduce.innerHTML = res.playlist.description;
            topBoxIntroduce.classList.add('topBoxIntroduce');

            let share = document.createElement('div');//分享
            topBox.appendChild(share);
            let shareIcon = document.createElement('img');
            shareIcon.src = '../assets/分享 (1).png';
            share.appendChild(shareIcon);
            shareIcon.classList.add('shareIcon');
            let shareText = document.createElement('div');
            share.appendChild(shareText);
            shareText.classList.add('shareText');
            shareText.innerHTML = '分享给微信好友';
            share.classList.add('share');

            // 上方大盒的背景色
            let helpSongList = document.getElementById('helpSongList');
            if (numberIdList == 19723756) {
                topBox.classList.add('red');
                share.classList.add('shareColor');
                helpSongList.classList.add('red')
            } else if (numberIdList == 3779629) {
                topBox.classList.add('green');
                share.classList.add('shareColor');
                helpSongList.classList.add('green')
            } else if (numberIdList == 3778678) {
                topBox.classList.add('orange');
                share.classList.add('shareColor');
                helpSongList.classList.add('orange')
            } else {
                topBox.classList.add('blue');
                share.classList.add('shareColor');
                helpSongList.classList.add('blue')
            }

            // 播放全部
            document.getElementById('yuanAndStart').addEventListener('click', function () {
                let songListData = {
                    songListId: idList[0],
                    songMusicPicture: res.playlist.tracks[0].al.picUrl,
                };
                localStorage.setItem('songListData', JSON.stringify(songListData));
                location.href = './songDetail.html';
            })



            // 歌单列表
            for (let i = 0; i < res.playlist.tracks.length; i++) {
                let total = document.getElementById('totalBox');//获取大盒子
                total.classList.add('total');

                let normalBox = document.createElement('div');//一排
                total.appendChild(normalBox);
                normalBox.classList.add('normalBox');

                let numberBox = document.createElement('div');//序号
                normalBox.appendChild(numberBox);
                numberBox.innerHTML = (i + 1);
                numberBox.classList.add('numberBox');

                let songAndPeople = document.createElement('div');//装上下两个小盒子
                normalBox.appendChild(songAndPeople);
                songAndPeople.classList.add('songAndPeople');


                let songName = document.createElement('div');  //歌曲名字盒子
                songName.innerHTML = res.playlist.tracks[i].name;
                songAndPeople.appendChild(songName);
                songName.classList.add('songName');


                let middleBox = document.createElement('div');
                songAndPeople.appendChild(middleBox);
                middleBox.classList.add('middleBox');

                // let special = document.createElement('div');
                // middleBox.appendChild(special);
                // special.innerHTML = 'SQ';
                // special.classList.add('special');

                let singPeoples = document.createElement('div');//唱歌的人们
                middleBox.appendChild(singPeoples);
                singPeoples.classList.add('singPeoples')
                for (let k = 0; k < res.playlist.tracks[i].ar.length; k++) {
                    let people = document.createElement('div');
                    singPeoples.appendChild(people);
                    if(k==res.playlist.tracks[i].ar.length-1){
                    people.innerHTML = res.playlist.tracks[i].ar[k].name + '-';
                }else {
                    people.innerHTML = res.playlist.tracks[i].ar[k].name + '/';
                }
                }

                let background = document.createElement('div');//背景
                middleBox.appendChild(background);
                background.innerHTML = res.playlist.tracks[i].al.name;
                background.classList.add('background');

                let yuan = document.createElement('div');//创建一个圆
                normalBox.appendChild(yuan);
                yuan.classList.add('yuanRight')
                let triangle = document.createElement('div');//创建一个三角形
                yuan.appendChild(triangle);
                triangle.classList.add('triangleRight');
            }

            //获取每一首歌的id并把id传给下一个页面,以及音乐背景以及数据长度   
            let normalBoxList = document.getElementsByClassName('normalBox');
            // alert(normalBoxList.length);
            let idList = [];
            for (let i = 0; i < normalBoxList.length; i++) {
                idList[i] = res.playlist.tracks[i].id;
            }
            for (let i = 0; i < normalBoxList.length; i++) {
                normalBoxList[i].addEventListener('click', function () {
                    let songListData = {
                        songListId: idList[i],
                        songMusicPicture: res.playlist.tracks[i].al.picUrl,
                        dataLength: res.playlist.tracks.length,
                        eachSongName: res.playlist.tracks[i].name
                    };
                    localStorage.setItem('songListData', JSON.stringify(songListData));
                    location.href = './songDetail.html';
                })
            }
        }
    })
}