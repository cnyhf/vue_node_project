import moment from 'moment'
moment.locale("zh-cn")
//格式化时间信息
const formatTime = {
    getTime:(date)=>{
        return moment(date).format('YYYY/MM/DD')
    }
}
export default formatTime