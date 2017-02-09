/**
 * Created by root on 2/9/17.
 */
import "babel-polyfill"
import R from "ramda"

let str = "abc"
let str_iterator = str[ Symbol.iterator ]()

// return the iterator object.  object
console.log(typeof str_iterator)

// get the first value of first iterate. "a"
console.log(str_iterator.next().value)

let obj = {
	a : 1,
	b : 2
}

// for(let x of obj){
//
// 	// type error, because the obj didn't implement the "iterable" protocol.
// 	 console.log(x)
// }

obj[ Symbol.iterator ] = function(){
	return {
		pro_list : R.map((x) => this[ x ], Object.keys(this)),
		next(){
			"use strict";
			if(R.isEmpty(this.pro_list)){
				return{
					done:true
				}
			}
			let curr_item=R.head(this.pro_list)
			this.pro_list=R.tail(this.pro_list)
			return{
				value:curr_item
			}
		}
	}
}

for(let x of obj){

	// simulate the "for in" keyword,only return the own property, because "Object.keys()". 1 2
	console.log(x)

}


// the follow code is equal the above, just use the generator function to simplify.
let obj_2={
	a:3,
	b:4
}
obj_2[Symbol.iterator]=function *(){
	for(let x in this){
		if(this.hasOwnProperty(x)){
			yield this[x]
		}
	}
}
for(let x of obj_2){

	// 3 4
	console.log(x)

}