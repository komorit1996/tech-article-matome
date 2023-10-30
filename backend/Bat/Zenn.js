// api から呼び出せるように変更する
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const PostsZenn = require("../models/PostsZenn");

require("dotenv").config({ path: "../.env" });

//
const BaseURL = 'https://zenn.dev';

// connect database
mongoose.connect("mongodb+srv://komorit1996:IkEUBIGuTj6IvnAQ@cluster0.8hmp8q6.mongodb.net/").then(() => {
    console.log("Create Connection DB...");
    console.log("コネクションを作成しました。");
}).catch((err) => {
    console.log(err);
});

// get data
axios.get(BaseURL)
    .then(async (response) => {
        const $ = cheerio.load(response.data);
        $('.ArticleList_container__V4svj').each(async (i, elem) => {
            const title = $(elem).find('.ArticleList_link__4Igs4').text();
            const link = $(elem).find('.ArticleList_link__4Igs4').attr('href');
            const date = $(elem).find('.ArticleList_date__0iYdB').attr('datetime');
            const likes = $(elem).find('.ArticleList_like__7aNZE').text();

            // get data from the second URL
            const getTagsURL = `${BaseURL}${link}`;
            axios.get(getTagsURL)
                .then(async (response2) => {
                    const $2 = cheerio.load(response2.data);
                    const tags = [];
                    $2('.View_topicLink__jdtX_').each((i, elem) => {
                        tags.push($2(elem).text());
                    });

                    // Create obj
                    const newData = {
                        title: title,
                        link: BaseURL + link,
                        postDate: date,
                        likes: likes,
                        tags: tags
                    };

                    try {
                        const result = await PostsZenn.findOneAndUpdate(
                            { link: link },
                            newData,
                            { upsert: true, new: true, setDefaultsOnInsert: true }
                        );
                        console.log("Document updated or created successfully: ", result);
                    } catch (err) {
                        console.error("Error updating or creating document: ", err);
                    }
                })
                .catch((error2) => {
                    console.error("Error fetching data from the second URL: ", error2);
                });
        });
    })
    .catch((error) => {
        console.error(error);
    });
