export function errorWrapper(callback){
    try {

        return callback()
        
    } catch (error) {
        console.error(error)
    }
}