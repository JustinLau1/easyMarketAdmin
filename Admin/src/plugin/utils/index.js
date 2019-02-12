function dateRule(e){
    return e<10?0+''+e:e
}
class utils {
    /*
	 type
	 0:yy-mm-dd
	 1:yy-mm-dd hh-mm-ss
	 2:hh-mm-ss
	 * */
    formateDate = (seconds,type) =>{
        let time = new Date(seconds);
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        let day = time.getDate();
        let hours = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        switch(type){
            case 0 :return [year,month,day].map(dateRule).join('-'); break;
            case 1 :return [year,month,day].map(dateRule).join('-')+' '+
                [hours,minute,second].map(dateRule).join(':') ; break;
            case 2 :return [hours,minute,second].map(dateRule).join(':'); break;
        }
    }
}
export default utils