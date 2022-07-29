import { App } from '../index'

App.get('/form', (req, res, next) => {
    res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener</title>

    <link rel="stylesheet" type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">

    <style type="text/css">
        body {
            background-color: #DADADA;
        }

        body>.grid {
            height: 100%;
        }

        .image {
            margin-top: -100px;
        }

        .column {
            max-width: 450px;
        }
    </style>
</head>
<body>
    <div class="ui middle aligned center aligned grid">
        <div class="column">
            <h2 class="ui teal header">
                <div class="content">
                    Shorten a URL
                </div>
            </h2>
            <form class="ui large form">
                <div class="ui stacked segment">
                    <div class="field">
                        <div class="ui left input">
                            <input type="text" name="url_to_shorten" placeholder="URL To Shorten">
                        </div>
                    </div>
                    
                    <div class="ui fluid large teal submit button">Shorten It</div>
                </div>

                <div class="ui error message"></div>

            </form>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>

    <script>
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
            return false;
        };

        $(document)
            .ready(function () {

                $('.ui.form').form();

                var url_to_shorten = getUrlParameter('url_to_shorten');

                if (url_to_shorten) {
                    $.ajax({
                        type: "POST",
                        url: "/shorten",
                        // The key needs to match your method's input parameter (case-sensitive).
                        data: JSON.stringify({
                            url_to_shorten
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            console.log('Success', data);
                            alert('Your URL is /s/'+data);
                            window.location = '/form'
                        },
                        error: function (errMsg) {
                            console.log('error', errMsg);
                        }
                    });
                }
            });
    </script>
</body>
</html>
    `)
})