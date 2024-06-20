

module.exports = class Scene {
    constructor() { }

    catchEvents() {
        throw new Error('catchEvents method must be implemented by children class')
    }

    join() {
        throw new Error('join method must be implemented by children class')
    }

    allReadyCallback(p_io, p_socket, p_thisRoom) {
        throw new Error('allReadyCallback method must be implemented by children class')
    }

    getInfo() {
        throw new Error('getInfo method must be implemented by children class')
    }

    getState() {
        throw new Error('getState method must be implemented by children class')
    }

    destroy(){
        throw new Error('destroy method must be implemented by children class') 
    }
}