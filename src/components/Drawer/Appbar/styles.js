import styled, { css } from 'styled-components';


export const Container = styled.div`
  display: flex;
  header {
    background-color: rgb(255, 255, 255);
  }
.logo{
  padding:10px;
  left:55px;
  margin-top:15px;
  position:fixed;
  
}
.name{
  color:black;
}
  //SIDER BAR STYLES
  ${({ theme }) => css`
    .MuiDrawer-paper {
      background-color: ${theme.colors.secondary};
    }

    .MuiDrawer-paper svg, .MuiDrawer-paper {
      color: #FFF;
      font-size: 22px;
     
    }

    .MuiDivider-root {
      background-color: #FFFFFF;
      width: 90%;
      margin-left: 5%;
    }

    .MuiTypography-root {
      font-size: 17px;
      
    }

    .MuiListItemIcon-root {
      min-width: 32px;
      margin-left: 15px;
      
    }
    .MuiList-root li {
      display: flex;
      flex-direction: column;
     

    }
    .MuiCollapse-root .muiListItemText-root{
      padding-left:31px;
    }
    .MuiList-root li a, .MuiListItemButton-root, .MuiCollapse-root {
      width: 100%;
    }
  `}
`;

export const BoxAvatar = styled.div`
  display:  flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

