import { validationResult } from 'express-validator'

export const validateRequest = (req: any, res: any, next: any) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() })
    }
    next()
}
