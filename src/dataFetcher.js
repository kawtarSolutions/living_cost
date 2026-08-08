import { data } from "./dataTest";

function dataFetcher(city) {
    console.log(city);
    return Promise.resolve(data);
}

export {dataFetcher};