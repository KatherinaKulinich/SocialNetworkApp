import { useCallback } from "react"




export const useValidateLogForm = () => {

    const validateEmail = useCallback((value: string) => {
        const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

        if (!value) {
            return 'Required field'
        }
        if (!validEmail.test(value)) {
            return 'Invalid email address'
        }

    },[])


    const validatePassword = useCallback((value: string) => {
        if (!value) {
            return 'Required field'
        }
        if (value.length < 8) {
            return 'Invalid password. Your password must be at least 8 characters'
        }

    }, [])


    const validateName = useCallback((value:string) => {
        const validName = /^[a-zA-Zа-яёїА-Я]+$/
        
        if (!value) {
            return 'Required field'
        }
        if (!validName.test(value)) {
            return 'Invalid value'
        }
    }, [])

    
    return {
        validateEmail, 
        validateName, 
        validatePassword,
    }
}