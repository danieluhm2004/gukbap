const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('assets'))


app.get('*', (req, res) => {
    let has_success = true;
    const name = decodeURI(req.path);
    const regex = name.match(/^\/([0-9,\,]{1,})+(만)*(원|달러)*$/i);
    
    if(!regex) return res.render('index', { has_success: false });
    let num = regex[1];
    const man = regex[2];
    console.log(regex);
    const danwe = regex.length >= 2 ? regex[3] : '원';

    if(regex.length <= 1) has_success = true;
    if(man === '만') num *= 10000;
    console.log(num);
    if(danwe === '달러') num /= 1196
    console.log(num);
    num /= 3500;
    num = Math.floor(num);

    console.log(num);
    res.render('index', {
        has_success,
        origin: name.substr(1, (name.substr(name.length - 1) === '원' || '달러' ? name.length - 1 : name.length)),
        gukbap: num
    });
});

app.listen(3000, () => {
    console.log('server has been enabled');
})