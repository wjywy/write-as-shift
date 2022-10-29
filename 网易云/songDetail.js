let songListData = JSON.parse(localStorage.getItem('songListData'));
let numbersongDetailId = songListData.songListId;    //id
let songDetailMusicPicture = songListData.songMusicPicture; //每条数据的picture
let songDetailName = songListData.eachSongName;//每首歌的名字
// alert(songDetailMusicPicture);
// alert(numbersongDetailId);
window.onload = function () {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: {
            id: numbersongDetailId,
            type: 0
        },
        url: 'http://localhost:3000/comment/hot',
        success: function (res) {

            document.getElementById('image1').addEventListener('click',function() {
                window.history.go(-1);
            });
            document.getElementById('image2').addEventListener('click',function() {
                window.location.href = './index.html'
            })
// alert(songDetailMusicPicture);
            let body = document.body;
            body.style.backgroundImage = "url('" + songDetailMusicPicture + "')";
            //歌曲名字区
            let SongsName = document.createElement('div');
            let topBox = document.getElementById('topBox');
            topBox.appendChild(SongsName);
            SongsName.innerHTML = songDetailName;
            SongsName.classList.add('souSuo')


            //这里是歌曲照片区
            let musicBackground = document.getElementById('pictureArea');
            let pictureArea = document.createElement('img');
            pictureArea.src = songDetailMusicPicture;
            musicBackground.appendChild(pictureArea);
            pictureArea.classList.add('pictureArea');


            //暂停播放按钮
            let yuan = document.createElement('div');   //圆圈
            yuan.id = 'yuanId';
            let triangle = document.createElement('div');//三角,即暂停图标
            triangle.id = 'triangleId';
            // let startSing = document.createElement('div');//两个三角，即播放图标
            musicBackground.appendChild(yuan);
            yuan.appendChild(triangle);
            // yuan.appendChild(startSing);
            yuan.classList.add('yuan');
            triangle.className = 'triangle';
            // startSing.classList.add('gone');
            //暂停播放事件
            let count = 2;
            let audioButton = document.createElement('audio');
            audioButton.src = 'http://music.163.com/song/media/outer/url?id=' + numbersongDetailId + '.mp3';
            musicBackground.appendChild(audioButton) //随便装进去
            triangle.addEventListener('click', function () {         //播放事件
                let songWordArea = document.getElementById('songWordArea');   //歌词滚动事件
           
                let scrollTop = setInterval(() => {
                    if(count % 2==0) {
                        clearInterval(scrollTop);
                    }else {
                        songWordArea.scrollTop++;
                    }
                },100);
                if (count % 2 == 0) {
                    triangle.className = 'startSing';
                    pictureArea.classList.add('pictureAreaRotate');
                    audioButton.play();
                } else {
                    triangle.className = 'triangle';
                    pictureArea.className = 'pictureArea';                    
                    audioButton.pause();
                }
                count++;
            })
//获取歌词
            $.ajax({
                url:'http://localhost:3000/lyric',
                data:{
                    id:numbersongDetailId
                },
                dataType:'json',
                type:'GET',
                success:function(res) {
                    console.log(res);
                    let songWordArea = document.getElementById('songWordArea');
                    let songWord = document.createElement('div'); 
                    songWordArea.appendChild(songWord);
                    changeSongWord = res.lrc.lyric;
                    songWord.innerHTML = changeSongWord.replace(/\[.*?\]/g,'');  //去除字符串中的中括号及其内容
                    songWord.className = 'songWord';
                },
                error:function(err) {
                    console.log(err);
                }
            })

//获取相似的歌
            $.ajax({
                type:"GET",
                data:{
                    id:numbersongDetailId
                },
                dataType:"json",
                url:'http://localhost:3000/simi/song',
                success:function(res) {
                    console.log(res);
                    for(let i=0;i<res.songs.length;i++) {
                        let similar = document.getElementById('similar');//获取总盒子
                        similar.classList.add('similar');

                        let simiNormalBox  = document.createElement('div');//一列盒子
                        similar.appendChild(simiNormalBox);
                        simiNormalBox.classList.add('simiNormalBox')

                        let simiImage = document.createElement('img');//相似歌的图片
                        simiNormalBox.appendChild(simiImage);
                        simiImage.src = res.songs[i].album.blurPicUrl;
                        simiImage.classList.add('simiImage');

                        let simiNameAndAuthorBackground = document.createElement('div');//装歌名与作者的盒子
                        simiNormalBox.appendChild(simiNameAndAuthorBackground);
                        simiNameAndAuthorBackground.classList.add('simiNameAndAuthorBackground');

                        let simiName = document.createElement('div');//歌名
                        simiNameAndAuthorBackground.appendChild(simiName);
                        simiName.innerHTML = res.songs[i].album.artists[0].name;
                        simiName.classList.add('simiName');

                        let simiAuthorBackground = document.createElement('div');//作者与背景
                        simiNameAndAuthorBackground.appendChild(simiAuthorBackground);
                        simiAuthorBackground.innerHTML 
                        = 
                        res.songs[i].name + '-' + res.songs[i].album.name;
                        simiAuthorBackground.classList.add('simiAuthorBackground');

                        let yuan = document.createElement('div');//创建一个圆
                        simiNormalBox.appendChild(yuan);
                        yuan.classList.add('yuanRight')
                        let triangle = document.createElement('div');//创建一个三角形
                        yuan.appendChild(triangle);
                        triangle.classList.add('triangleRight'); 

                    }

                    //传歌
                    let simiNormalBoxList = document.getElementsByClassName('simiNormalBox');
                    for(let i=0;i<simiNormalBoxList.length;i++) {
                        simiNormalBoxList[i].addEventListener('click',function() {
                            // res.songs[i].id
                            // res.songs[i].album.blurPicUrl
                            let songListData = {
                                songListId: res.songs[i].id,
                                songMusicPicture: res.songs[i].album.blurPicUrl,
                                eachSongName:res.songs[i].album.artists[0].name
                            };
                            localStorage.setItem('songListData', JSON.stringify(songListData));
                            location.href = './songDetail.html';
                        })
                    }
                },
                error:function (err) {
                    console.log(err);
                }
            })


            // let commentPeople = res.hotComments[0].user.nickname;
            // let picture = res.hotComments[0].user.avatarUrl;
            // let commentContent = res.hotComments[0].content;
            // let time = res.hotComments[0].timeStr;
            // let callCount = res.hotComments[0].likedCount;

            for (let i = 0; i < res.hotComments.length; i++) {

                let commentArea = document.getElementById('commentArea');//这里是评论区
                commentArea.classList.add('commentArea');

                let oneComment = document.createElement('div');//容纳一条评论的盒子
                commentArea.appendChild(oneComment);
                oneComment.classList.add('oneComment');

                let picture = document.createElement('img');//放头像
                oneComment.appendChild(picture);
                picture.src = res.hotComments[i].user.avatarUrl;
                picture.classList.add('picture');

                let peopleTimeContent = document.createElement('div')//用户时间评论三位一体
                oneComment.appendChild(peopleTimeContent);
                peopleTimeContent.classList.add('peopleTimeContent');

                let commentPeople = document.createElement('div')//用户名
                peopleTimeContent.appendChild(commentPeople);
                commentPeople.innerHTML = res.hotComments[i].user.nickname;
                commentPeople.classList.add('commentPeople');

                let time = document.createElement('div')//放时间
                peopleTimeContent.appendChild(time);
                time.innerHTML = res.hotComments[i].timeStr;
                time.classList.add('time');

                let commentContent = document.createElement('div')//放评论
                peopleTimeContent.appendChild(commentContent);
                commentContent.innerHTML = res.hotComments[i].content;
                commentContent.classList.add('commentContent');

                let callCount = document.createElement('div')//放点赞数
                oneComment.appendChild(callCount);
                callCount.innerHTML = res.hotComments[i].likedCount;
                callCount.classList.add('callCount');

                let call = document.createElement('img') //放点赞图标
                oneComment.appendChild(call);
                call.src = '../assets/点赞.png';
                call.classList.add('call')


                let divide = document.createElement('div');
                commentArea.appendChild(divide);
                divide.classList.add('divide');

            }

        },
        error: function (err) {
            console.log(err);
        }
    })
}