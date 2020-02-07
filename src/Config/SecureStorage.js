import SecureLS from 'secure-ls';

const ls = new SecureLS();

function setItem (name, value) {
   return ls.set(name, value )
}

function getItem (name) {
    return ls.get(name)
}

function removeItem (name) {
    return ls.remove(name)
}

export default {
    setItem,
    getItem,
    removeItem
}