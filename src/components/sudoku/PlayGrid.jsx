/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React, { useContext, useState } from 'react';
import { Button, message, Spin } from 'antd';
import { SudokuContext } from '@/context/SudokuContext';
import { SudokuSolutionContext } from '@/context/SudokuSolutionContext';
import { loadGrid } from '@/context/SudokuAction';
import { initial, updateResult } from '@/context/SudokuSolutionAction';
import GridService from '@/axios/GridService';
import CreateGridForm from './CreateGridForm';
import HelpModal from './HelpModal';
import Cell from './Cell';
import './gridStyles.css';
import bg from './bg.png';

const PlayGrid = () => {
    let { state: sudokuState, dispatch: sudokuDispatch } = useContext(SudokuContext);
    let { dispatch: sudokuSolutionDispatch } = useContext(SudokuSolutionContext);
    const [loading, setLoading] = useState(false);
    const [inputGridVisible, setInputGridVisible] = useState(false);
    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [inputForm, setInputForm] = useState(null);

    const handleCreate = () => {
        inputForm.validateFields((err, formValues) => {
            if (err) {
                return;
            }
            const newGridId = formValues.newGridId;
            sudokuDispatch(loadGrid(newGridId));
            sudokuSolutionDispatch(initial());
            inputForm.resetFields();
            setInputGridVisible(false);
        });
    };

    const handleClickResolve = e => {
        e.preventDefault();

        async function tryResolve() {
            setLoading(true);
            await GridService.tryResolve(sudokuState.gridId)
                .then(response => {
                    if ((response.status === 200) & (response.data.resolved === true)) {
                        message.success('Grid Resolved!');
                    } else {
                        message.warn('Grid not resolved');
                    }
                    sudokuDispatch(updateResult(response.data));
                    sudokuSolutionDispatch(updateResult(response.data));
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
