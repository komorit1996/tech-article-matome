const sortLikes = (data) => {
    const sortedData = [...data].sort((x, y) => y.likes - x.likes);
    return sortedData;
};

const filterTag = (data, tag) => {
    const filteredData = data.filter(value =>
        value.tags.some(item => item.toLowerCase().includes(tag.toLowerCase()))
    );
    return filteredData;
};

export { sortLikes, filterTag };
