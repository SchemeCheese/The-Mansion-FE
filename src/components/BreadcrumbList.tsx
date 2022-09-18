import React from 'react';
import { Breadcrumb } from 'antd';

interface Props {
  data: string[];
}

function BreadcrumbList({ data }: Props) {
  return (
    <Breadcrumb className="breadcrumb">
      {data.map((item: string, index: number) => {
        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbList;
