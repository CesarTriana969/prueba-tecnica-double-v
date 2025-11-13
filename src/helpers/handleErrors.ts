import Swal from "sweetalert2"

export async function handleError(code:string, callback:Function|null = null){

    Swal.fire({
        title: 'Error',
        text: getMessageError(code),
        icon:'error'
    })
}

export function getMessageError(code: string): string{
    const message: string = httpMessage[code] || "Error inesperado, vuelve a intentarlo."
    
    return message
}

export const httpMessage:Record<string, string> = {
    "auth/invalid-email" : "Correo electrónico inválido.",
    "auth/user-disabled" : "El usuario ha sido deshabilitado.",
    "auth/user-not-found": "Usuario no encontrado.", 
    "auth/wrong-password": "Contraseña incorrecta.", 
    "auth/invalid-credential": "Credenciales incorrectas.", 
    "auth/email-already-in-use": "El correo ya se encuentra registrado."
}