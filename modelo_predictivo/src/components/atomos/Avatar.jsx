import styled from 'styled-components';
import profile from '../../assets/profile.svg';

export const Avatar=({src, alt, size = "medium", className})=>{
 //Usa 'profile' si 'src' es undefined
 const imageSrc = src || profile;
 return(
  <StyledAvatar size={size} className={className}>
      <img src={imageSrc} alt={alt} />
    </StyledAvatar>
 )
}

const StyledAvatar = styled.div`
  border-radius: 50%;
  //Cuando un elemento tiene más contenido del que cabe en su tamaño (width o height), overflow: hidden; oculta cualquier parte que exceda los límites :v
  overflow: hidden;
  

  //Condicionales insertadas mediante javascript.
  ${(props) =>
    props.size === "small" &&
    `
    width: 32px;
    height: 32px;
  `}
  
  ${(props) =>
    props.size === "medium" &&
    `
    width: 48px;
    height: 48px;
  `}
  
  ${(props) =>
    props.size === "large" &&
    `
    width: 64px;
    height: 64px;
  `}
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
/*
const getSizeStyles = (size) => {
  if (size === "small") {
    return "width: 32px; height: 32px;";
  } else if (size === "medium") {
    return "width: 48px; height: 48px;";
  } else if (size === "large") {
    return "width: 64px; height: 64px;";
  }
  return ""; 
};

const StyledAvatar = styled.div`
  border-radius: 50%;
  overflow: hidden;
  
  ${(props) => getSizeStyles(props.size)}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
*/