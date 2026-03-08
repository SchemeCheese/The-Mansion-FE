import React from 'react';
import { Card, Col, Row } from 'ui/antd';
import numeral from 'numeral';

interface Props {
  avg?: number | string;
  consum?: number | string;
  type?: number | string;
  yoy?: number | string;
}

function Header({ avg, consum, type, yoy }: Props) {
  return (
    <Card bordered={false}>
      <Row>
        <Col sm={8} xs={24}>
          <div className="header-infor">
            <span>M-T-D Consumption</span>
            <p>{type ? `${consum} MWh` : `${consum} m3`}</p>
            <em />
          </div>
        </Col>
        <Col sm={8} xs={24}>
          <div className="header-infor">
            <span>Daily Avg.</span>
            <p>{type ? `${numeral(avg).format('0,00')} MWh` : `${avg} m3`}</p>
            <em />
          </div>
        </Col>
        <Col sm={8} xs={24}>
          <div className="header-infor">
            <span>Y-o-Y</span>
            <p>{`${numeral(yoy).format('0,00')} %`}</p>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default Header;
