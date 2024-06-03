export const useValidationStore = () => {

    const requiredRules = (key: string = "Field") => {
        return (value: string) => (value && value.length > 0) || `Field is required`;
    }
    
    const maxLengthRules = (length: number, key: string = "Field") => {
        return (value: string) => (value && value.length <= length) || `${key} must be ${length} characters or less`;
    }
    
    const notIncludes = (pattern: string, key: string = "Field") => {
        return (value: string) => (value && !value.includes(pattern)) || `The ${key} must not contain ${pattern}`;  
    }

    return {
        requiredRules,
        maxLengthRules,
        notIncludes,
    }
}

const validation = useValidationStore();

export {validation}
