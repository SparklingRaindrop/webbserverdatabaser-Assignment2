function prepareQuery(newDataObj) {
    const targets = Object.keys(newDataObj).reduce((result, key) => {
        result += `${result !== '' ? ', ' : ''}${key} = $${key}`;
        return result;
    }, '');

    const parameters = {...newDataObj};
    for (const property in newDataObj) {
        parameters[`$${property}`] = newDataObj[property];
        delete parameters[property];
    }

    return {
        targets,
        parameters
    };
}

module.exports = {
    prepareQuery
}