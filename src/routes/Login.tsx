import 'antd/dist/antd.min.css';

import React from 'react';
import { useDispatch } from 'react-redux';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input } from 'antd';

import { login } from 'actions';

import PattonButton from 'components/PattonButton';

function Login() {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const { email, password } = values;

    dispatch(login({ email, password }));
  };

  return (
    <Form
      className="login-form"
      initialValues={{
        remember: true,
      }}
      name="normal_login"
      onFinish={onFinish}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-49%, -49%)',
        minWidth: 370,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <svg
          fill="none"
          height="46"
          viewBox="0 0 38 46"
          width="38"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.434 7.75741L19.687 33.6537L9.63937 10.7151C9.2606 9.43496 8.80505 8.25809 8.27273 7.18446C5.91822 2.50795 3.67632 0.112912 1.5419 0.0045165C0.881613 -0.0316155 0.538674 0.149044 0.5182 0.546496C0.507963 0.758126 0.7946 1.00073 1.38323 1.2743C2.26873 1.65626 2.95461 2.05372 3.44598 2.47698C4.74608 3.54545 5.3859 4.30938 5.36542 4.76361C5.3603 4.82555 5.20675 4.92363 4.89964 5.05783C4.59253 5.19204 4.42873 5.44496 4.40826 5.80628C4.38267 6.26051 4.78703 6.9625 5.61111 7.91742C6.80884 9.28527 7.63804 10.3641 8.11406 11.1435L8.22666 11.6029L8.00145 11.5926C7.79159 11.5822 7.5459 11.4996 7.26951 11.35C6.98799 11.2003 6.81907 11.1228 6.76277 11.1177C6.10248 11.0815 5.74931 11.4584 5.70836 12.2481C5.68789 12.6094 6.22021 13.5592 7.30533 15.087C7.79671 15.7787 8.17036 16.3104 8.43652 16.6975V17.8795C8.35463 17.8227 8.21131 17.673 8.00145 17.4253C7.73017 17.1053 7.41794 16.9401 7.05452 16.9194C6.18438 16.873 5.72372 17.3375 5.67253 18.3079C5.64694 18.7931 5.81585 19.3661 6.17415 20.0216C6.78837 20.9662 7.41794 21.8953 8.06799 22.809C8.21131 23.0412 8.32903 23.2683 8.43652 23.4955V26.1434C7.39747 23.9807 6.20486 22.8502 4.85869 22.778C3.83499 22.7264 3.30266 23.1238 3.26172 23.9703C3.23101 24.6052 3.98343 26.3447 5.52921 29.1888C7.06988 32.0329 7.81719 33.9531 7.766 34.9545C7.76088 35.0474 7.72505 35.1506 7.65851 35.2693C7.37187 35.0112 7.08012 34.4641 6.79348 33.6279C6.43007 32.4872 6.12296 31.6819 5.87727 31.2122C5.54969 30.5877 5.06855 30.0302 4.44921 29.545C3.82475 29.0546 3.31802 28.8017 2.92901 28.781C1.8746 28.7243 1.31669 29.3643 1.25015 30.7012C1.2092 31.46 1.71593 32.4717 2.76522 33.7415C4.04485 35.2642 4.86381 36.5701 5.23234 37.654L5.17604 37.9224C4.99689 37.9121 4.84333 37.8915 4.72561 37.8553C3.95783 37.5095 3.24124 37.0656 2.58096 36.5133C2.00256 36.0591 1.69545 35.832 1.66474 35.8268C0.610332 35.77 0.0575334 36.3068 0.0012299 37.4269C-0.0243626 37.9741 0.349289 38.5212 1.13754 39.0787C3.02627 40.3897 3.93224 41.8505 3.85035 43.4558C3.84011 43.6984 3.8094 43.9255 3.77357 44.1371L3.79916 44.5501C3.99878 44.772 4.24959 44.8908 4.55158 44.9062C5.33471 44.9475 6.41471 42.919 7.79671 38.8309C9.62401 33.4782 10.6477 28.9462 10.878 25.2143L19.6 45.1127L29.3814 23.4645L32.5703 43.5797H37.6836L31.434 7.75741Z"
            fill="#4D4D4D"
          />
        </svg>

        <p
          style={{
            textTransform: 'uppercase',
            fontSize: '25px',
            marginBottom: -5,
            fontWeight: 500,
          }}
        >
          The Mansions{' '}
        </p>

        <p style={{ paddingBottom: 20 }}>Property Management System </p>
      </div>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input placeholder="Email" prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" noStyle>
          <Checkbox>Keep logged in</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/reset-password" style={{ float: 'right' }}>
          Reset password
        </a>
      </Form.Item>

      <Form.Item>
        <PattonButton
          className="login-form-button"
          htmlType="submit"
          style={{ width: '100%', height: 40 }}
          type="primary"
        >
          Log in
        </PattonButton>
      </Form.Item>
    </Form>
  );
}

export default Login;
