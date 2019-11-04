/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import axios from 'axios';
import { GRID_URL } from './config';

class GridService {
    tryResolve = gridId => {
        return axios.get(`${GRID_URL}/${gridId}`);
    };
}

export default new GridService();
