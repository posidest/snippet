   
   
   
   export const parseDate = (timestamp) => {
        let mos = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let res = timestamp.slice(0, timestamp.indexOf('T'));
        res = res.split('-')
        let arr = [res[1], res[2] += ', ', res[0]]
        let month = mos[Number(arr[0]) - 1];
        arr.shift()
        arr.unshift(month)
        res = arr.join(' ')
        return res;
    }

