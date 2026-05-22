export const checkAuthenticate = async () => {
    try {
        await new Promise((resolve)=> setTimeout(resolve, 1000))
        return false
    } catch (error) {
        console.error("Auth check failed", error)
        return false
    }
}