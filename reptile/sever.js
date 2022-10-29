let data = await request.create({
    url: 'https://juejin.im/auth/type/email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: '155com', password: 'cfdsd.'}) //账号密码
  });

const request  =require('request');

const cookie = data.headers['set-cookie'];
const encodeToken = cookie[0]
  .split(';')[0]
  .split('=')[1];
const decodeToken = JSON.parse(new Buffer(encodeToken, 'base64').toString())

async function getTopics(request, typeKey) {
    const { token, clientId, userId } = require('./user.json');
    const querystring = qs.stringify({
      src: 'web',
      uid: userId,
      device_id: clientId,
      token: token,
      limit: 20,
      category: 'all',
      recomment: 1
    });
    const types = {
      timeline: 'get_entry_by_timeline', //最新
      comment: 'get_entry_by_comment',   //评论
      rank: 'get_entry_by_rank'          //热门
    };
    const data = await request.get({
      url: `https://timeline-merger-ms.juejin.im/v1/${types[typeKey]}?${querystring}`,
      headers: {
        host: 'timeline-merger-ms.juejin.im',
        referer: 'https://juejin.im/timeline?sort=comment'
      }
    });
    const body = data.body;
    if (body.s !== 1) {     //出错时清空信息
      fs.writeFileSync('./user.json', JSON.stringify({}));
      throw { type: 'token', message: body.m };
    } else {
      return body.d.entrylist;
    }
  }
  