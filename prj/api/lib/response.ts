import { Response } from 'express'

interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
}

function apiResponse<T>(
    res: Response,
    status: number,
    data?: T,
    error?: string
): void {
    const response: ApiResponse<T> = {
        success: status >= 200 && status < 300,
    }

    if (data !== undefined) {
        response.data = data
    }

    if (error !== undefined) {
        response.error = error
    }

    res.status(status).json(response)
}

export function successResponse<T>(res: Response, data: T): void {
    apiResponse(res, 200, data)
}

export function errorResponse(
    res: Response,
    status: number,
    error: string
): void {
    apiResponse(res, status, undefined, error)
}
