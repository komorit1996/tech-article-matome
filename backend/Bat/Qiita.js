const PostsQiita = require("../models/PostsQiita");
const baseURL = 'https://qiita.com/api/v2/items?';
const qiitaToken = 'Bearer d31b98addf14325aba7a5e6d49b82670a0bc9611';
const mongoose = require('mongoose');

///// get one week ago /////
const currentDate = new Date();
const threeDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
const formattedDate = `${threeDaysAgo.getFullYear()}-${String(threeDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(threeDaysAgo.getDate()).padStart(2, '0')}`;

// connect database
mongoose.connect("mongodb+srv://komorit1996:IkEUBIGuTj6IvnAQ@cluster0.8hmp8q6.mongodb.net/").then(() => {
    console.log("Create Connection DB...");
    console.log("コネクションを作成しました。");
}).catch((err) => {
    console.log(err);
});

// build query
const query = `&query=created:>=${formattedDate}&stocks:>20`
// marge url
let requestURL = `${baseURL}page=1&per_page=100${query}`
// let requestURL = `${baseURL}page=1&per_page=1${query}`
//
console.log(query);

// 
fetch(requestURL, {
    method: 'GET',
    headers: { "Authorization": `${qiitaToken}` }
})
    .then(response => response.json())
    .then(async result => {
        for (const item of result) {
            try {
                // Check if the item already exists in the database
                const existingPost = await PostsQiita.findOne({ title: item.title });
                if (existingPost) {
                    // Update the existing post
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
                } else {
                    // Create a new post if it doesn't exist
                    const newTags = item.tags.map(tag => tag.name);
                    const newPost = new PostsQiita({
                        title: item.title,
                        link: item.url,
                        postDate: item.created_at,
                        likes: item.stocks_count,
                        tags: newTags
                    });
                    await newPost.save();
                    console.log(`New data saved: ${newPost}`);
                }
            } catch (err) {
                console.error("Error saving data: ", err);
            }
        }
    })
    .catch(error => console.log('error', error));
