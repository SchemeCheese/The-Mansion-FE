import React from 'react';
import { Box, Container } from 'styled-minimal';

function Footer() {
  return (
    <Box as="footer" backgroundColor="#F0F2F5">
      <Container style={{ textAlign: 'center', marginTop: 11, paddingBottom: 10 }}>
        <span style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)' }}>
          Copyright©2023 The Mansions Hospitality
        </span>
      </Container>
    </Box>
  );
}

export default Footer;
