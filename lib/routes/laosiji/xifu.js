const axios = require('@/utils/axios');

module.exports = async (ctx) => {
    let url = 'https://www.laosiji.com/proxy/api';
    let response = await axios({
        method: 'post',
        url: url,
        data: 'method=%2Fsearch%2Fywf%2Findexapi&cityid=332&search=%E5%AA%B3%E5%A6%87%E5%BD%93%E8%BD%A6%E6%A8%A1&type=1&page=2',
        // headers: { 'Content-Type': 'application/x-www-form-urlencodeed' },
    });

    const data = response.data.body.search.sns.list;

    ctx.state.data = {
        title: '老司机-媳妇当车模',
        link: 'https://www.laosiji.com/search/index?keyword=%E5%AA%B3%E5%A6%87%E5%BD%93%E8%BD%A6%E6%A8%A1',
        description: '老司机-媳妇当车模',
        item: data.map(({ title, description, id, image, createtime }) => ({
            title: title === '' ? description : title,
            link: `http://www.laosiji.com/thread/${id}.html`,
            description: `<img referrerpolicy="no-referrer" src="${image.url}">${description}`,
            pubDate: new Date(createtime).toUTCString(),
        })),
    };
};
