/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React, { useContext, useState, useEffect } from 'react';
import { SudokuContext } from '@/context/SudokuContext';
import { updateResult } from '@/context/SudokuAction';
import GridService from '../../axios/GridService';
import Cell from './Cell';
import { Button, Form, message, Modal, Input, Spin } from 'antd';
import './gridStyles.css';
import bg from './bg.png';

const DEMO_GRID =
    '000000018948007050000008020053702000009000000000901430090600000030500876060000000';
const DEMO_GRID2 =
    '002010000040500360706300500000100000500030007000004000004001203061003040000020800';

const CreateGridForm = Form.create()(props => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    const onGridKeyPress = e => {
        const keychar = String.fromCharCode(e.which);
        const numcheck = /\d/;
        if (!numcheck.test(keychar)) {
            e.preventDefault();
        }
    };

    const onGridInput = e => {
        const value = e.target.value;
        const numcheck = /[^\d]/;
        if (numcheck.test(value)) {
            const newValue = value.replace(/[^\d]/gi, '');
            e.target.value = newValue;
        }
    };

    return (
        <Modal
            visible={visible}
            title="创建新盘"
            okText="创建"
            cancelText="取消"
            onCancel={onCancel}
            onOk={onCreate}
            width={710}
        >
            <Form layout="vertical">
                <Form.Item label="盘面">
                    {getFieldDecorator('newGridId', {
                        initialValue: DEMO_GRID2,
                        autoFocus: true,
                        rules: [
                            {
                                type: 'string',
                                len: 81,
                                message: '请输入81个数字，0表示空格',
                            },
                            {
                                required: true,
                                message: '请输入新盘',
                            },
                        ],
                    })(
                        <Input
                            maxLength={81}
                            placeholder="请按行依次输入81个单元格的数字（0表示空格）"
                            autoFocus
                            pattern="[0-9]{81}"
                            width={660}
                            onKeyPress={onGridKeyPress}
                            onInput={onGridInput}
                        />
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
});

const PlayGrid = () => {
    let { dispatch: sudokuDispatch } = useContext(SudokuContext);
    const [gridId, setGridId] = useState(DEMO_GRID);
    const [, setPlaced] = useState(DEMO_GRID);
    const [cell, setCell] = useState(Array.from(DEMO_GRID));
    const [loading, setLoading] = useState(false);
    const [inputGridVisible, setInputGridVisible] = useState(false);
    const [inputForm, setInputForm] = useState(null);

    const showInputGridModal = () => {
        setInputGridVisible(true);
    };

    const handleCancel = () => {
        setInputGridVisible(false);
    };
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

    useEffect(() => {
        setCell(Array.from(gridId));
    }, [gridId]);

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
                                                        key={'cell' + iRow * 9 + iCol}
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
                    <Button onClick={showInputGridModal}>新盘</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>选盘</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => message.warn('Under Construction')}>单步></Button>
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={e => handleClickResolve(e)}>
                        解盘>>
                    </Button>
                    <CreateGridForm
                        ref={setInputForm}
                        visible={inputGridVisible}
                        onCancel={handleCancel}
                        onCreate={handleCreate}
                    />
                </div>
            </div>
        </Spin>
    );
};

export default PlayGrid;
