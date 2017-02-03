/**
 * Created by root on 2/3/17.
 */
import "babel-polyfill"
import R from "ramda"
let protoObj = {x : 1}
function Obj(y){
	this.y = y
	this.z = 100
}
Obj.prototype = protoObj
let objX = new Obj(3)
console.log(Object.keys(objX))
for(let x in objX){
	if(objX.hasOwnProperty(x)) console.log(objX[ x ])
}

objX[ Symbol.iterator ] = function(){
	return {
		attribute_list : Object.keys(this),
		main_obj : this,
		next(){
			"use strict";
			if(R.isEmpty(this.attribute_list)){
				return {
					value : undefined,
					done : true
				}
			}
			let obj = {}
			obj.value = this.main_obj[ R.head(this.attribute_list) ]
			obj.done = false
			this.attribute_list = R.tail(this.attribute_list)
			return obj
		}
	}
}
for(let x of objX){
	console.log(x)
}

function * Generator(n){
	"use strict";
	for(let i = n; i < n + 3; i++){
		yield i
	}
}
let ge = new Generator(10)
R.times(() => console.log(ge.next()),
	5)