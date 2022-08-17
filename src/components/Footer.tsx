import React from 'react';
import { Box, Container } from 'styled-minimal';

function Footer() {
  return (
    <Box as="footer" backgroundColor="#E5E5E5">
      <Container py={3} style={{textAlign: 'center'}}>
        <span style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.45)'}}>Copyright©2020 The Mansions Hospitality</span>
      </Container>
    </Box>
  );
}

export default Footer;
