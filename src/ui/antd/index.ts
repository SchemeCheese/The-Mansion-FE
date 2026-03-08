/* eslint-disable react/function-component-definition, react/destructuring-assignment, unicorn/prefer-export-from */
import React from 'react';
import {
  Alert,
  App as AntdApp,
  Dropdown as AntdDropdown,
  Steps as AntdSteps,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Pagination,
  Radio,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Typography,
  Upload,
} from 'antd';

import type { DropdownProps as AntdDropdownProps } from 'antd';

// Keep compatibility with legacy Dropdown usage that passed `overlay` nodes.
type LegacyDropdownProps = AntdDropdownProps & {
  dropdownRender?: AntdDropdownProps['popupRender'];
  overlay?: React.ReactNode;
};

const Dropdown = ({ dropdownRender, overlay, popupRender, ...rest }: LegacyDropdownProps) => {
  let popupRenderCompat = popupRender ?? dropdownRender;

  if (overlay !== undefined && rest.menu === undefined && popupRenderCompat === undefined) {
    popupRenderCompat = () => React.createElement(React.Fragment, null, overlay);
  }

  return React.createElement(AntdDropdown, {
    ...rest,
    popupRender: popupRenderCompat,
  } as AntdDropdownProps);
};

// Keep compatibility with legacy Steps API (`Steps.Step` children).
const LegacyStep = () => null;

const Steps: any = (props: any) => {
  if (Array.isArray(props?.items) || !props?.children) {
    return React.createElement(AntdSteps, props);
  }

  const children = React.Children.toArray(props.children) as React.ReactElement[];
  const items = children.map(child => {
    const childProps: any = child.props ?? {};

    return {
      title: childProps.title,
      description: childProps.description,
      subTitle: childProps.subTitle,
      icon: childProps.icon,
      status: childProps.status,
      disabled: childProps.disabled,
    };
  });

  const nextProps = { ...props, items };

  delete nextProps.children;

  return React.createElement(AntdSteps, nextProps);
};

Steps.Step = LegacyStep;

export {
  Alert,
  AntdApp,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Pagination,
  Radio,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
  Steps,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Typography,
  Upload,
};

export type {
  ButtonProps,
  FormProps,
  InputProps,
  RadioChangeEvent,
  UploadFile,
  UploadProps,
} from 'antd';
