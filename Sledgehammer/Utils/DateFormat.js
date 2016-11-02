module.exports = {
	formatDate: function(date, str){
		let format = {
			"%%": "%",
			"%a": ["Sun", "Mon", "Tue", "Wed", "Fri", "Sat"][date.getDay()],
			"%A": ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"][date.getDay()],
			"%b": ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()],
			"%B": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()],
			"%d": date.getDay(),
			"%D": date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear().toString().substring(2, 4),
			"%H": date.getHours(),
			"%m": date.getMonth()+1,
			"%M": date.getMinutes(),
			"%S": date.getSeconds(),
			"%T": date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
			"%y": date.getFullYear().toString().substring(2, 4),
			"%Y": date.getFullYear()
		};
		for(let x in format){
			let reg = new RegExp(x, "g");
			str = str.replace(reg, format[x]);
		}
		return str;
	}
};