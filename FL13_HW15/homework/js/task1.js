function assign(objAssign = {}, ...arg) {
    arg.forEach(obj => {
        const key = Object.keys(obj)
        const value = Object.values(obj)
        key.forEach((item, index) => {
            objAssign[key[index]] = value[index]
        })
    })
    return objAssign
}