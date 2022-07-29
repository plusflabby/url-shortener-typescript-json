import { App } from '../index'
import { Get_Data } from '../lib/JSON_DB'

App.get('/s/:Short_URL', (req, res, next) => {
    const { Short_URL } = req.params;

    const Find_URL: string = Get_Data('Shortened', Short_URL);
    if (!Find_URL) return res.sendStatus(404);

    res.redirect(Find_URL);
})