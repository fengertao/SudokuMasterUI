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
                                        <div className="text-muted">收藏</div>
                                        <h2>301</h2>
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
                                        <div className="text-muted">云数据</div>
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
                                        <div className="text-muted">照片</div>
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
                                    <h3>任务</h3>
                                    <small>10个已经完成，2个待完成，1个正在进行中</small>
                                </div>
                                <span className="card-tool">
                                    <Icon type="sync" />
                                </span>
                                <Timeline>
                                    <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                                    <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>联调接口</p>
                                        <p>功能验收</p>
                                    </Timeline.Item>

                                    <Timeline.Item color="#108ee9">
                                        <p>登录功能设计</p>
                                        <p>权限验证</p>
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
