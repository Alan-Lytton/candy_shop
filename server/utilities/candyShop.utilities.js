function capitalize(str) {
    const words = str.split(/\s+/);
    const capitalWords = words.map(word => {
            if(word.includes('&')){
                return word;
            }else{
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            }
        })
        return capitalWords.join(' ');
}

module.exports = { capitalize };


