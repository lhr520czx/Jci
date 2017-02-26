/**
 * Created by root on 2/23/17.
 */

let J = {
	map(data, callback){
		const data_type = data.constructor.name
		if(data_type === Array){
			return Array.prototype.map.call(data, callback)
		}else if(data_type === Object || NodeList){
			let result = []
			for(let x in data){
				if(data.hasOwnProperty(x)){
					result.push(callback(data[ x ]))
				}
			}
			return result
		}else{
			console.log(`the J.map does n't support this ${data.constructor.name}`)
		}
	},
	filter(array, callback){
		return Array.prototype.filter.call(array, callback)
	},
	contain(array, value){
		for(let x of array){
			if(x === value){
				return true
			}
		}
		return false
	},
	forEach(array, callback){
		return Array.prototype.forEach.call(array, callback)
	},
	to_array(obj){
		let result = []
		for(let x of obj){
			result.push(x)
		}
		return result
	},
	valid_value(value, funs){
		return this.map(
			funs,
			(x) =>{
				return x(value)
			}
		)
	},
	valid_object(obj, valid_obj){
		let result = new Map()
		for(let x in obj){
			if(obj.hasOwnProperty(x) && valid_obj.hasOwnProperty(x)){
				result.set(x, this.valid_value(obj[ x ], valid_obj[ x ]))
			}
		}
		return result
	},
	length_valid_ge(n){
		return function(data){
			if(data.length >= n){
				return `string less than ${n} char`
			}
			return "ok"
		}
	},
	not_empty(x){
		if(x !== "" && x !== undefined){
			return "ok"
		}
		return "is empty"
	},
	has_space(str){
		const reg = /\s/
		if(str.search(reg) !== -1){
			return "has space"
		}
		return "ok"
	},
	too_simple(str){
		const reg = /[^\w]/
		if(str.search(reg) === -1){
			return "too simple"
		}
		return "ok"
	},
	get_form_obj(selector){
		const inputs = document.querySelectorAll(selector)
		const pair_array = this.map(
			inputs,
			(x) => [ x.name, x.value ]
		)
		return this.to_obj(pair_array)
	},
	to_obj(array){
		let obj = {}
		this.forEach(
			array,
			(x) => obj[ x[ 0 ] ] = x[ 1 ]
		)
		return obj
	},
	is_empty(array){
		return array.length===0
	}
}
if(typeof require !== "undefined"){
	module.exports = J
}