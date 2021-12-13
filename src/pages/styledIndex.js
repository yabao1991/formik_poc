import styled from 'styled-components';

const StyledIndex = styled('div')`
  position: absolute;
  top: 80px;
  max-width: 640px;
  min-width: 300px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 6px;
  left: 0;
  right: 0;
  margin: 0 auto;

  .formData {
    position: fixed;
    top: 30px;
    right: 30px;
    max-width: 400px;
    overflow: scroll;
  }
`;

export default StyledIndex;
