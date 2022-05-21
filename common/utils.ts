//
/* 
return {
    success: true,
    data: data
} or {
    success: false, 
    error: {message: 'xxx'}
}
*/
export interface IJsonResponse {
    success: boolean,
    data?: any,
    error?: { message: string }
}
async function json_response(r: any): Promise<IJsonResponse> {
    if (r.ok) {
        const d = await r.json()
        return {
            data: d,
            success: true
        }
    } else {
        const isJson = r.headers.get("content-type")?.includes("application/json")
        const data = isJson ? await r.json() : null
        let error = {
            message: `${r.status} - (${r.statusText})`
        }
        if (data && data.error && data.error.message) {
            error = data.error
        }
        return {
            success: false,
            error: error
        }
    }
}

function try_with(fn: any) {
    return async (req: any, res: any, next: any) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

const utils = {
    json_response,
    try_with
}

export default utils