/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React, { useContext, useState, useEffect } from 'react';
import { Button, message, Spin } from 'antd';
import { SudokuContext } from '@/context/SudokuContext';
import { updateResult } from '@/context/SudokuAction';
import GridService from '@/axios/GridService';
import CreateGridForm from './CreateGridForm';
import HelpModal from './HelpModal';
import Cell from './Cell';
import './gridStyles.css';
import bg from './bg.png';

const DEMO_GRID =
    '000000018948007050000008020053702000009000000000901430090600000030500876060000000';

const PlayGrid = () => {
    let { dispatch: sudokuDispatch } = useContext(SudokuContext);
    const [gridId, setGridId] = useState(DEMO_GRID);
    const [, setPlaced] = useState(DEMO_GRID);
    const [cell, setCell] = useState(Array.from(DEMO_GRID));
    const [loading, setLoading] = useState(false);
    const [inputGridVisible, setInputGridVisible] = useState(false);
    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [inputForm, setInputForm] = useState(null);

    useEffect(() => {
        setCell(Array.from(gridId));
    }, [gridId]);

    const handleCreate = () => {
        inputForm.validateFields((err, formValues) => {
            if (err) {
                return;
            }
            const newGridId = formValues.newGridId;
            setGridId(newGridId);
            setPlaced(newGridId);
            setCell(Array.from(newGridId));
            inputForm.resetFields();
            setInputGridVisible(false);
        });
    };

    const handleClickResolve = e => {
        e.preventDefault();

        if (gridId.length !== 81) {
            message.error('Please input 81 digital numbers');
            return;
        }

        async function tryResolve() {
            setLoading(true);
            await GridService.tryResolve(gridId)
                .then(response => {
                    if ((response.status === 200) & (response.data.resolved === true)) {
                        setCell(Array.from(response.data.answer));
                        setPlaced(response.data.answer);
                        message.success('Grid Resolved!');
                    } else {
                        setCell(Array.from(response.data.answer));
                        message.warn('Grid not resolved');
                    }
                    sudokuDispatch(updateResult(response.data));
                })
                .catch(error => {
                    message.error(error.message);
                });

            setLoading(false);
        }

        tryResolve();
    };

    return (
        <Spin spinning={loading} size="large" tip="思考中...">
            <div style={{ textAlign: 'center', margin: '0px auto', height: 444 }}>
                <img src={bg} className="gridBg" alt="bg" />

                <div className="gridFg">
                    <div style={{ position: 'relative', left: 0 }}>
                        <table id="tab" className="gridTable">
                            <tbody>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(iRow => {
                                    return (
                                        <tr key={'tr' + iRow} className="grid">
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(iCol => {
                                                return (
                                                    <Cell
                                                        key={'cell' + (iRow * 9 + iCol)}
                                                        index={iRow * 9 + iCol}
                                                        value={cell[iRow * 9 + iCol]}
                                                    />
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <p />
                    <Button onClick={() => setHelpModalVisible(true)}>游戏帮助</Button>
                    &nbsp;&nbsp;
                    <Button
                        onClick={() => {
                            setInputGridVisible(true);
                        }}
                    >
                        创建新盘
                    </Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>重置盘面</Button>
                    <p />
                    <Button onClick={() => message.warn('Under Construction')}>保存盘面</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>提取盘面</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>保存残局</Button>
                    <p />
                    <Button onClick={() => message.warn('Under Construction')}>提取残局</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>点评盘面</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>单步执行</Button>
                    <p />
                    <Button type="primary" onClick={e => handleClickResolve(e)}>
                        解盘&nbsp;&nbsp;> >
                    </Button>
                    <CreateGridForm
                        ref={setInputForm}
                        visible={inputGridVisible}
                        onCancel={() => setInputGridVisible(false)}
                        onCreate={handleCreate}
                    />
                    <HelpModal
                        visible={helpModalVisible}
                        onCancel={() => setHelpModalVisible(false)}
                    />
                </div>
            </div>
        </Spin>
    );
};

export default PlayGrid;
