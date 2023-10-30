// Home.jsx
import Topbar from '../components/topbar/Topbar';
import Article from '../components/Article/Article';
import React, { useEffect, useState } from 'react';
import { sortLikes, filterTag } from '../hooks/sortsData'
import { TextField, Stack, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import './Home.css'

const Home = () => {
    // useState
    const [qiitaData, setQiitaData] = useState([]);
    const [zennData, setZennData] = useState([]);
    const [qiitaFilterdData, setFilterdQiitaData] = useState([]);
    const [zennFilterdData, setFilterdZennData] = useState([]);
    const [isFilterdTag, setFilterdTag] = useState(false);
    const [topTags, setTopTags] = useState([]);

    // 初回レンダリング時
    useEffect(() => {
        const fetchData = async () => {
            try {
                ///// qiita のデータを取得
                const qiitaResponse = await fetch('http://localhost:3030/api/qiita');
                const qiitaData = await qiitaResponse.json();
                setQiitaData(qiitaData);
                ///// zenn のデータを取得
                const zennResponse = await fetch('http://localhost:3030/api/zenn');
                const zennData = await zennResponse.json();
                setZennData(zennData);
                // 単語の出現回数をカウント ロジック不明なので確認する
                const combineObjects = [...zennData, ...qiitaData]; // そのほかのデータがあれば追加する
                let tagsArray = [];
                combineObjects.map((i) => {
                    tagsArray = tagsArray.concat(i.tags);
                });
                const wordCount = tagsArray.reduce((acc, word) => {
                    acc[word] = (acc[word] || 0) + 1;
                    return acc;
                }, {});
                const sortedWordCount = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
                setTopTags(sortedWordCount);

            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    // sort like
    const handleLikes = () => {
        const sortedQiitaData = sortLikes([...qiitaData]);
        const sortedZennData = sortLikes([...zennData]);
        setQiitaData(sortedQiitaData);
        setZennData(sortedZennData);
    }

    // search tags
    const handleTags = (e) => {
        let tag = '';
        if (typeof e === 'object' && e !== null) {
            if (e.target && e.target.value) {
                tag = e.target.value;
            }
        } else {
            tag = e;
        }
        if (tag) {
            const filteredQiitaData = filterTag(qiitaData, tag);
            const filteredZennData = filterTag(zennData, tag);
            setFilterdQiitaData(filteredQiitaData);
            setFilterdZennData(filteredZennData);
            setFilterdTag(true);
        } else {
            setFilterdQiitaData([]);
            setFilterdZennData([]);
            setFilterdTag(false);
        }
    };

    return (
        <>
            <Topbar />
            <div className="sortbuttonContainer">
                <Stack spacing={4} direction="row" className='optionContainer'>
                    <SearchIcon />
                    <TextField id="outlined-basic" label="タグ名を入力してEnter" variant="outlined" onKeyDown={(e) => handleTags(e)} />
                    <FilterListIcon />
                    <Button variant="contained" onClick={() => handleLikes()}>いいね数順</Button>
                    <h2>人気のタグ :</h2>  {topTags.slice(0, 7).map((tag, index) => (
                        <p key={index} className='articleTagsSquare-top' onClick={() => handleTags(tag[0])}>{`${tag[0]}:${tag[1]}`}</p>
                    ))}
                </Stack>
            </div>
            <div className="homeContainer">
                <div className="articleRow">
                    <Article
                        title="Qiita"
                        data={isFilterdTag ? qiitaFilterdData : qiitaData}
                        sorcePage="https://qiita.com/"
                        handleTags={handleTags}
                    />
                    <Article
                        title="Zenn"
                        data={isFilterdTag ? zennFilterdData : zennData}
                        sorcePage="https://zenn.dev/"
                        handleTags={handleTags}
                    />
                    <Article
                        title="StackOverFlow"
                        data={zennData}
                        sorcePage="https://stackoverflow.com/?tab=hot"
                        handleTags={handleTags}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
