// const { default: axios } = require('axios');
var axios = require("axios").default;
var qs = require("qs");


const postAnalysis = (url) => {
    const options = createOptions(url);

    return axios.request(options)
    .then(response => {
        // response.data.website.contents.forEach(paragraph => console.log(paragraph + '\n'));
        contents = response.data.website.contents;
        return contents;
    })
    .catch(error => {
        console.log(error);
    });
};

const createOptions = (url) => {
    var options = {
        method: 'POST',
        url: 'https://text-analysis12.p.rapidapi.com/website-extraction/api/v1.3',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
            'x-rapidapi-key': 'cdd272ca75mshe121e3b556e47edp170e96jsn82669f5224d3'
        },
        data: qs.stringify({language: 'english', url: url})
    };
    return options;
}

module.exports = {postAnalysis};
    


