import { Router } from 'express';


export function kommoRoutes(app: any) {

    const router = Router()


    router.get('/kommo', (req, res) => {
        res.json({
            message: 'Kommo API is working!'
        });
    });


    return router
}