import express from "express";
import homeController from '../controller/homeController';

let router = express.Router();
//init là khởi tạo
const initWebRoute = (app) =>{
    router.get(`/`, homeController.getHomepage)

    router.get(`/about`, (req, res) => {
        res.send(`I'm Alfie`)
    })

    return app.use('/', router)
}

export default initWebRoute;
// module.export = initWebRoute;