const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3';

let movies = [];
axios.get(url).
then((response) => {

    let $ = cheerio.load(response.data);
    $('#customerReviews').each(function(el , index){
        let rating = $(this).find('.itemRating strong').text();
        let reviewer_names = $(this).find('dl.reviewer dd:nth-child(2)').text()
        let reviewer_name = reviewer_names.slice(0,reviewer_names.length-1)
       let review_Comment = $(this).find('.rightCol p').text();
       let review_date = $(this).find('dl.reviewer dd:nth-child(4)').text();
        movies.push({ Reviewer_name: reviewer_name, Rating: rating, Review_Comment: review_Comment, Review_date: review_date});
    });
    console.log(movies.slice(1));

}).catch((error)=>{
    console.log(error);
})