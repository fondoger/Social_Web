
function init() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        try {
            MyStorage[key] = JSON.parse(data);
        }
        catch(error) { }
    }
}

function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    MyStorage[key] = value;
}

const MyStorage = {
    init,
    setItem,
};

export default MyStorage;