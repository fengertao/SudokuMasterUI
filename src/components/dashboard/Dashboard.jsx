/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '@/style/imgs/avatar_man.svg';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="heart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">收藏数独</div>
                                        <h2>108</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">解盘次数</div>
                                        <h2>30122</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">解盘步骤截图</div>
                                        <h2>802</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">邮件</div>
                                        <h2>102</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={16}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>数独大师开发进度</h3>
                                </div>
                                <span className="card-tool">
                                    <Icon type="sync" />
                                </span>
                                <Timeline>
                                    <Timeline.Item color="green">用户及登录管理</Timeline.Item>
                                    <Timeline.Item color="green">
                                        <p>数独大师已完成任务：</p>
                                        <p>用户可以录入新盘并由计算机智能解盘</p>
                                        <p>可以查看解题步骤</p>
                                        <p>可以在解题步骤的复盘链接处查看每一步的盘面</p>
                                        <p>用户手动解盘</p>
                                        <p>用户在单元格记笔记</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>数独大师待完成任务：</p>
                                        <p>保存和提取盘面</p>
                                        <p>残局存盘和提取</p>
                                        <p>计时器</p>
                                        <p>游戏历史记录</p>
                                        <p>单步游戏</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="#108ee9">
                                        <p>系统待完成任务：</p>
                                        <p>数据库备份和恢复</p>
                                        <p>页面排版</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>消息栏</h3>
                                </div>
                                <span className="card-tool">
                                    <Icon type="sync" />
                                </span>
                                <ul className="list-group no-border">
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img
                                                src={b1}
                                                className="img-responsive img-circle"
                                                alt="test"
                                            />
                                        </span>
                                        <div className="clear">
                                            <span className="block">Charlie</span>
                                            <span className="text-muted">欢迎光临数独大师！</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img
                                                src={b1}
                                                className="img-responsive img-circle"
                                                alt="test"
                                            />
                                        </span>
                                        <div className="clear">
                                            <span className="block">Charlie</span>
                                            <span className="text-muted">
                                                本网站为技术方案测试和演示系统，请勿录入私人信息
                                            </span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img
                                                src={b1}
                                                className="img-responsive img-circle"
                                                alt="test"
                                            />
                                        </span>
                                        <div className="clear">
                                            <span className="block">Charlie</span>
                                            <span className="text-muted">
                                                首页是静态页面，数独和用户页面已经可以使用
                                            </span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img
                                                src={b1}
                                                className="img-responsive img-circle"
                                                alt="test"
                                            />
                                        </span>
                                        <div className="clear">
                                            <span className="block">Charlie</span>
                                            <span className="text-muted">
                                                对本网站的评论请在https://github.com/fengertao/SudokuMasterServ开issue
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>
                                </div>
                                <span className="card-tool">
                                    <Icon type="sync" />
                                </span>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
