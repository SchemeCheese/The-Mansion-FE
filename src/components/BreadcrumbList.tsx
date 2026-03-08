import React from 'react';
import { Breadcrumb } from 'ui/antd';
import layoutStyles from 'components/layout.module.css';

interface Props {
  data?: string[];
}

function BreadcrumbList({ data }: Props) {
  return (
    <Breadcrumb className={layoutStyles.breadcrumb}>
      {data?.map((item: string, index: number) => {
        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbList;
