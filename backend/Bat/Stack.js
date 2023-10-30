// api から呼び出せるように変更する
const axios = require('axios');
const mongoose = require('mongoose');
const PostsStack = require("../models/PostsStack");
require("dotenv").config({ path: "../.env" });

const token = 'Bearer 7PCdBI5jRuuJR1f12M)r5Q(('

///// get one week ago /////
const currentDate = new Date();
const threeDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
const formattedDate = `${threeDaysAgo.getFullYear()}-${String(threeDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(threeDaysAgo.getDate()).padStart(2, '0')}`;

// 日付の作成
const fromDate = new Date('2014-12-16');
const toDate = new Date('2015-01-16');
// エポックからの経過秒数を取得
const fromEpochSeconds = Math.floor(currentDate.getTime() / 1000);
const toEpochSeconds = Math.floor(formattedDate.getTime() / 1000);

// build url
const BaseURL = 'https://api.stackexchange.com/2.2/questions?'
const query = `page=1&pagesize=100&order=desc&sort=hot&site=ja.stackoverflow&fromdate=${fromEpochSeconds}&todate=${toEpochSeconds}`;
const requestURL = BaseURL + query

// connect database
/*
mongoose.connect("mongodb+srv://komorit1996:IkEUBIGuTj6IvnAQ@cluster0.8hmp8q6.mongodb.net/").then(() => {
    console.log("Create Connection DB...");
    console.log("コネクションを作成しました。");
}).catch((err) => {
    console.log(err);
});
*/

// fetch リクエストの設定
fetch(requestURL, {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
   })
    .then(async data => {
        // Check if the item already exists in the database
        const existingPost = await PostsStack.findOne({ title: item.title });
        if (existingPost) {
            const newTags = item.tags.map(tag => tag.name);
            await PostsQiita.findOneAndUpdate(
                { title: item.title },
                {
                    $set: {
                        link: item.url,
                        postDate: item.created_at,
                        likes: item.stocks_count,
                        tags: newTags
                    }
                },
                { new: true }
            );
            console.log(`Data updated: ${PostsQiita}`);


        // 取得したデータを処理する
        console.log(data);

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


