const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	//usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
	nombre: false,
	apellido: false,
	fechaNac: false,
	email: false,
	password: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;

		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;

		/*case "fechaNac":
			validarCampo(expresiones.fechaNac, e.target, 'fechaNac');
		break;*/

		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;

		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
			
		break;

		case "passwor2":
			validarPassword2();
		
		break;
	}
}	



const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
		document.querySelector(`#grupo_${campo} .form_input_error`).classList.remove('form_input_error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
		document.querySelector(`#grupo_${campo} .form_input_error`).classList.add('form_input_error-activo');
		campos[campo] = false;
	}
}	

const validarPassword2 = () => {
	const inputpassword = document.getElementById('password');
	const inputpassword2 = document.getElementById('password2');

	if(inputpassword.value !== inputpassword2.value){
		document.getElementById(`grupo_password2`).classList.add('formulario_grupo-incorrecto');
		document.querySelector(`#grupo_password2 .form_input_error`).classList.add('form_input_error-activo');
	} else {
		document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-incorrecto');
		document.querySelector(`#grupo_password2 .form_input_error`).classList.remove('form_input_error-activo');

	}
}



inputs.forEach ((inputs) => {
	inputs.addEventListener ('keyup', validarFormulario);
	inputs.addEventListener ('blur', validarFormulario);
	});


	formulario.addEventListener('submit', (e) => {
		e.preventDefault();
	
		const terminos = document.getElementById('terminos');
		if(campos.nombre && campos.apellido && campos.fechaNac && campos.email && campos.password && terminos.checked ){
			formulario.reset();
	
			document.getElementById('form_mensaje_exito').classList.add('form_mensaje_exito-activo');
			setTimeout(() => {
				document.getElementById('form_mensaje_exito').classList.remove('form_mensaje_exito-activo');
			}, 3000);
	
		} else {
			document.getElementById('form_mensaje').classList.add('form_mensaje-activo'); 
		}
	});
