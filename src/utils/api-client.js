import axios from "axios";
import config from '../config.json';

//development URL
// export default axios.create({
//     baseURL:"http://localhost:5000/api",
// });


//deploymemt URL
export default axios.create({
    baseURL:`${ config.backendURL}/api`,
});