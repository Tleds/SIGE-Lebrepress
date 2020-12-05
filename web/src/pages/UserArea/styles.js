import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
export const Title = styled.h1``;
export const Table = styled.table`
  width: 80%;
  margin: 30px auto;
  text-align: left;
`;
export const Head = styled.tr`
  width: 80%;
`;
export const HeadItem = styled.th`
  font-size: 1.5rem;
`;
export const Body = styled.tr`
  width: 80%;
`;
export const BodyItem = styled.td`
  font-size: 1.2rem;
`;
export const Button = styled.button`
  height: 40px;
  width: 150px;
  font-size: 1.4rem;
  margin: 10px;
`;