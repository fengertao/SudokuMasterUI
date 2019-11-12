/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import axios from 'axios';
import { GRID_URL } from './config';

class GridService {
    resolveGrid = gridId => {
        return axios.get(`${GRID_URL}/${gridId}/resolve`);
    };

    resolvePosition = (gridId, cells) => {
        let position = cells.reduce((a, b) => a.concat('|').concat(b));
        return axios.get(`${GRID_URL}/${gridId}/resolve/${position}`);
    };

    ValidatePosition = (gridId, cells) => {
        let position = cells.reduce((a, b) => a.concat('|').concat(b));
        return axios.get(`${GRID_URL}/${gridId}/validate/${position}`);
    };

    saveGrid = gridId => {
        return axios.put(`${GRID_URL}/${gridId}`);
    };

    findAllGrid = () => {
        return axios.get(`${GRID_URL + 's'}`);
    }
}

export default new GridService();
