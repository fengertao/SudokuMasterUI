/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React, { useContext, useState } from 'react';
import { Button, message, Spin, Modal } from 'antd';
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
    const [inputVisible, setInputVisible] = useState(false);
    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [inputForm, setInputForm] = useState(null);

    const isGridChanged = () => {
        for (let i = 0; i < 81; i++) {
            if (sudokuState.originalCells[i] === '0') {
                if (sudokuState.cells[i] !== '') {
                    return true;
                } else {
                    continue;
                }
            }
            if (sudokuState.originalCells[i] !== sudokuState.cells[i]) {
                return true;
            }
        }
        return false;
    };

    /**
     * user has input one digital in each inputable cell.
     */
    const isCompleted = () => {
        for (let i = 0; i < 81; i++) {
            console.log(sudokuState.cells[i]);
            if (sudokuState.cells[i].length !== 1) {
                return false;
            }
        }
        return true;
    };

    const handleResetGrid = () => {
        if (isGridChanged()) {
            Modal.confirm({
                title: '你确认要重置盘面吗？',
                content: '确认后会回到初始盘面，所有步骤会丢失。',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    sudokuDispatch(loadGrid(sudokuState.gridId));
                },
                onCancel() {},
            });
        } else {
            message.info('已是初始盘面');
        }
    };

    const handleCreate = () => {
        inputForm.validateFields((err, formValues) => {
            if (err) {
                return;
            }
            const newGridId = formValues.newGridId;
            sudokuDispatch(loadGrid(newGridId));
            sudokuSolutionDispatch(initial());
            inputForm.resetFields();
            setInputVisible(false);
        });
    };

    const handleClickResolve = () => {
        async function resolve() {
            setLoading(true);
            if (!isGridChanged()) {
                await GridService.resolveGrid(sudokuState.gridId)
                    .then(response => {
                        if (response.status === 200 && response.data.resolved === true) {
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
            } else {
                await GridService.resolvePosition(sudokuState.gridId, sudokuState.cells)
                    .then(response => {
                        if (!response.data.isValid) {
                            message.warn(response.data.msg);
                            return;
                        }
                        if (response.status === 200 && response.data.resolved) {
                            message.success('Position Resolved!');
                        } else {
                            //Todo more check
                            message.warn('Position not resolved');
                        }
                        sudokuDispatch(updateResult(response.data));
                        sudokuSolutionDispatch(updateResult(response.data));
                    })
                    .catch(error => {
                        message.error(error.message);
                    });
            }
            setLoading(false);
        }

        resolve();
    };

    const validateAnswer = () => {
        if (!isCompleted()) {
            message.warn(
                '尚有单元格未完成。如果您希望检查目前输入的正确性，请点击<检查残局>按钮。'
            );
            return;
        }
        async function tryValidateAnswer() {
            setLoading(true);
            await GridService.ValidatePosition(sudokuState.gridId, sudokuState.cells)
                .then(response => {
                    if ((response.status === 200) & (response.data.isValid === true)) {
                        message.success('恭喜您正确完成数独！');
                    } else {
                        message.warn(response.data.msg, 10);
                    }
                })
                .catch(error => {
                    message.error(error.message);
                });

            setLoading(false);
        }
        tryValidateAnswer();
    };

    const validatePosition = () => {
        async function tryValidatePosition() {
            setLoading(true);
            await GridService.ValidatePosition(sudokuState.gridId, sudokuState.cells)
                .then(response => {
                    if ((response.status === 200) & (response.data.isValid === true)) {
                        message.success('残局校验正确。');
                    } else {
                        message.warn(response.data.msg, 10);
                    }
                })
                .catch(error => {
                    message.error(error.message);
                });

            setLoading(false);
        }

        tryValidatePosition();
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
                    <Button onClick={() => setInputVisible(true)}>创建新盘</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => handleResetGrid()}>重置盘面</Button>
                    <p />
                    <Button onClick={() => validateAnswer()}>检查结果</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>保存盘面</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>提取盘面</Button>
                    <p />
                    <Button onClick={() => validatePosition()}>检查残局</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>保存残局</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>提取残局</Button>
                    <p />
                    <Button onClick={() => message.warn('Under Construction')}>点评盘面</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>单步执行</Button>
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={e => handleClickResolve(e)}>
                        解盘&nbsp;&nbsp;> >
                    </Button>
                    <CreateGridForm
                        ref={setInputForm}
                        visible={inputVisible}
                        onCancel={() => setInputVisible(false)}
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
