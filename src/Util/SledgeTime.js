const c = {
	d: {
		s: [
			"Mon", "Tue", "Wed", "Thu",
			"Fri", "Sat", "Sun"
		],
		l: [
			"Monday", "Tuesday", "Wednesday",
			"Thursday", "Friday", "Saturday", "Sunday"
		]
	},
	m: {
		s: [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		],
		l: [
			"January", "Feburary", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		]
	}
}

/**
 * 
 * @param {Date} date 
 */
function genFormatObject(date) {
	return {
		"%%": "%\u220b",
		"%a": c.d.s[date.getDay()],
		"%A": c.d.l[date.getDay()],
		"%b": c.m.s[date.getMonth()],
		"%B": c.m.l[date.getMonth()]
	}
}

class SledgeTime {
	/**
	 * @constructor
	 * @param {String} format 
	 */
	constructor(format) {
		this.format = format;
	}

	/**
	 * 
	 * @param {Date|Number} date 
	 * @returns {String}
	 */
	parse(date) {
		let str = this.format;
		date = this.constructor.genRegexObject(date);
		for(let x in date) {
			let reg = new RegExp(x, "g");
			str = str.replace(reg, date[x]);
		}
		return str;
	}

	/**
	 * 
	 * @param {Date} d 
	 */
	static genShortDate(d) {
		return {
			d: d.getDay(),
			dt: d.getDate().toString().padStart(2, "0"),
			mth: (d.getMonth() + 1).toString().padStart(2, "0"),
			y: d.getFullYear().toString().substring(2, 4).padStart(2, "0"),
			yr: d.getFullYear().toString(),

			hr: d.getHours().toString().padStart(2, "0"),
			min: d.getMinutes().toString().padStart(2, "0"),
			sec: d.getSeconds().toString().padStart(2, "0"),
			mill: d.getMilliseconds().toString().padStart(3, "0"),

			t: d.getTime()
		}
	}

	/**
	 * 
	 * @param {Date|Object} d 
	 */
	static genRegexObject(d) {
		if (d instanceof Number || Date) {
			d = this.genShortDate(new Date(d));
		}

		return {
			"%%": "%\u200b",
			"%a": c.d.s[d.d],
			"%A": c.d.l[d.d],
			"%b": c.m.s[d.mtr],
			"%B": c.m.l[d.mtr],
			"%d": d.dt,
			"%D": `${d.mtr}/${d.dt}/${d.yr}`,
			"%H": d.hr,
			"%m": d.min,
			"%M": d.mth,
			"%s": d.mill,
			"%S": d.sec,
			"%T": `${d.h}:${d.min}:${d.sec}`,
			"%y": d.y,
			"%Y": d.yr
		}
	}
}

module.exports = SledgeTime;