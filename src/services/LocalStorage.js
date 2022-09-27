class LocalStorage {
    constructor(){

    }

    setItem(key, data){
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }

    getItem(key){
        return localStorage.getItem(key);
    }

    removeItem(key){
        localStorage.removeItem(key);
        return true;
    }
}

export default LocalStorage;