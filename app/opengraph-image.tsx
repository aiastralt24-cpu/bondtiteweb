import {ImageResponse} from 'next/og';
export const alt='Bondtite by Astral: adhesives for furniture, fabrication and everyday repairs';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',padding:'64px',background:'#0c2543',color:'white',fontFamily:'sans-serif'}}><div style={{display:'flex',fontSize:30,letterSpacing:5,color:'#dfb85d'}}>BONDTITE BY ASTRAL</div><div style={{display:'flex',flexDirection:'column',fontSize:78,fontWeight:700,lineHeight:1.1}}><span>For the things</span><span style={{color:'#dfb85d'}}>we bring together.</span></div><div style={{display:'flex',fontSize:27}}>Wood adhesives · Epoxies · Rubber adhesives · Instant adhesives</div></div>,size);}
