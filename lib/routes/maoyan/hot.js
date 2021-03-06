const axios = require('@/utils/axios');

module.exports = async (ctx) => {
    const response = await axios({
        method: 'get',
        url: 'https://m.maoyan.com/ajax/movieOnInfoList',
    });
    const data = response.data.movieList;
    const items = await Promise.all(
        data.map(async (item) => {
            const rating = item.sc > 0 ? `评分：${item.sc}` : '';

            return {
                title: `${item.nm} ${rating}`,
                description: `<img src="${item.img.replace('w.h', '1000.1000')}" referrerpolicy="no-referrer"> <br> ${rating} <br> 演员：${item.star} <br> 上映信息：${item.showInfo}`,
                link: `https://maoyan.com/films/${item.id}`,
                pubDate: new Date(item.rt).toUTCString(),
            };
        })
    );

    ctx.state.data = {
        title: `猫眼电影 - 正在热映`,
        link: `https://maoyan.com/films`,
        description: `猫眼电影 - 正在热映`,
        item: items,
    };
};
