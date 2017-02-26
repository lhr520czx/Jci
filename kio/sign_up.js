/**
 * Created by root on 2/21/17.
 */
// import J from "jci"
const ajax = new XMLHttpRequest()
const el_usr_name = document.getElementById("username")
const el_pass_div = document.getElementById("password_div")
const el_cf_pass_div = document.getElementById("confirm_password_div")
const el_usr_div = document.getElementById("username_div")
const el_pass = document.getElementById("password")
const el_cf_pass = document.getElementById("confirm_password")
const el_feedback = document.getElementById("feedback")
const el_btn = document.querySelector("button")

el_btn.disabled = true





function new_keeper(){
	let flag = 0
	let obj = {
		success(){
			el_btn.classList.add("btn-primary")
			el_btn.disabled = false
		},
		disable(){
			el_btn.classList.remove("btn-primary")
			el_btn.disabled = true
		},
		inc(){
			if(flag >= 2){
				this.success()
			}else if(flag===1){
				flag += 1
				this.success()
			}else{
				flag+=1
			}
		},
		dec(){
			if(flag >0) flag -= 1
			if(flag <2) this.disable()
		}
	}
	return obj
}
const trigger = new_keeper()



function to_danger(input, div){
	input.classList.remove("el_form-control-success")
	div.classList.add("has-danger")
	div.classList.remove("has-success")
	input.classList.add("el_form-control-danger")
}

function to_success(input, div){
	div.classList.add("has-success")
	input.classList.remove("el_form-control-danger")
	div.classList.remove("has-danger")
	input.classList.add("el_form-control-success")
}

function valid(value, callback){
	ajax.onload = callback
	ajax.open("get", `/sign_up${value}`, true)
	ajax.send()
}

el_usr_name.addEventListener('input',
	//  delete ajax valid feature
//  function(){
// 	valid(this.value, function(){
// 		if(ajax.status === 200){
// 			if(ajax.responseText === "yes"){
// 				to_success(el_usr_name, el_usr_div)
// 				el_feedback.textContent = ""
// 				trigger.inc()
// 			}else{
// 				trigger.dec()
// 				el_feedback.textContent = "the username already exit"
// 				to_danger(el_usr_name, el_usr_div)
// 			}
// 		}else{
// 			console.log("ajax err")
// 		}
// 	})
// }
bug

)
el_cf_pass.addEventListener("input", function(){
	if(el_pass.value&&el_pass.value === el_cf_pass.value){
		to_success(el_cf_pass, el_cf_pass_div)
		to_success(el_pass, el_pass_div)
		trigger.inc()
	}else if(el_cf_pass.value&&el_pass.value !== el_cf_pass.value){
		trigger.dec()
		to_danger(el_cf_pass, el_cf_pass_div)
		to_danger(el_pass, el_pass_div)
	}
})
el_pass.addEventListener("input", function(){
	if(el_pass.value&&el_pass.value === el_cf_pass.value){
		to_success(el_cf_pass, el_cf_pass_div)
		to_success(el_pass, el_pass_div)
		trigger.inc()
	}else if(el_cf_pass.value&&el_pass.value !== el_cf_pass.value){
		trigger.dec()
		to_danger(el_cf_pass, el_cf_pass_div)
		to_danger(el_pass, el_pass_div)
	}
})
document.querySelector("#email").addEventListener("change",function(){
	const form_data=J.get_form_obj("form input")
	const not_less_5=J.length_valid_ge(5)
	const cf_pass=el_cf_pass.value
	const valid_obj={
		username:[J.not_empty],
		password:[
			not_less_5,
			J.not_empty,
			J.too_simple,
			(x)=>{
			if(x!==cf_pass){
				return "confirm password is not match"
			}
			return "ok"
			}
		]
	}
	let log_obj=J.valid_object(form_data,valid_obj)
	log_obj=J.map(
		J.to_array(log_obj),
		([k,array])=>[
			k,
			J.filter(
				array,
				(x)=>x!=="ok"
			)
		]
	)
	console.log(J.to_obj(log_obj))
})

function bug() {
				to_success(el_usr_name, el_usr_div)
				el_feedback.textContent = ""
				trigger.inc()
}