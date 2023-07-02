import Swal from "sweetalert2"



export const successToast = (message = 'success') => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        customClass: 'swal-toast',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
}

export const errorToast = (message = 'error') => {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        customClass: 'swal-toast',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })

 
} 

export const shorterString =  (string) => {
    console.log(string.length)
    if(string.length <= 30){
        return string
    }

    return string.slice(0,30) + '......';

}