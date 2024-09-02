import fs from 'fs'

const readData = (filepath) => {
    const data = fs.readFileSync(filepath);
    return JSON.parse(data);
};


const writeData = (data, filepath) => {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

export { readData, writeData }