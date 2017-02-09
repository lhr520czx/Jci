/**
 * Created by root on 2/9/17.
 */
import "babel-polyfill"
let proto_obj = {a : 1}
function Obj(b){
	this.b = b
}
Obj.prototype = proto_obj
let obj = new Obj(3)

//Property which it's own property.
// [ 'b' ]
console.log(Object.keys(obj))

for(let x in obj){
	// All property of object, include which inherit from it's prototype.
	// b a
	console.log(x)

}