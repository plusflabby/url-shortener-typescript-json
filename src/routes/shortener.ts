import { randomBytes } from 'crypto';
import { App } from '../index'
import { Get_Data, Save_Data } from '../lib/JSON_DB'
import { Link } from '../types/Links'

App.post('/shorten', (req, res, next) => {
    const { url_to_shorten } = req.body;

    console.log(`Lets shorten ${url_to_shorten}`)

    const Current_Link: Link = Get_Data('Links', url_to_shorten)
    if (Current_Link) {
        console.log(`Link found for ${url_to_shorten} || ${Current_Link.Shortened}`)
        return res.status(200).json(Current_Link.Shortened)
    }

    const Links = {
        [url_to_shorten]: {
            URL: url_to_shorten,
            Shortened: randomBytes(5).toString('hex')
        }
    }
    Save_Data('Links', Links)
    const Shortened = {
        [Links[url_to_shorten].Shortened]: url_to_shorten
    }
    Save_Data('Shortened', Shortened)

    res.status(200).json(Links[url_to_shorten].Shortened)
})