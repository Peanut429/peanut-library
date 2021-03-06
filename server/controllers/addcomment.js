
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid, openid, phone, location, comment} = ctx.request.body
    console.log(bookid, openid, phone, location, comment)
    try {
        await mysql('comments').insert({bookid, openid, phone, location, comment})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败' + e.sqlMessage
            }
        }
    }
}
