export function errorHandler(error: any) {
    if (error instanceof Error) {
        console.log(error.message)
    } else if (typeof error === "string") {
        console.log(error)
    } else {
        console.log("未定義のエラーです")
    }
}
