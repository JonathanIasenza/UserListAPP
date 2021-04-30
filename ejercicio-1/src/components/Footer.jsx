/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import '../styles/Footer.css';
import { AiFillGithub, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { IoLogoLinkedin } from "react-icons/io";
import { MdFolderShared } from "react-icons/md";


const Footer = () => {
  return (
    <React.Fragment>
    <footer className="footer">
      <div className="first">
        Jona Iasenza, <text className="blue-font">2021.</text>
        </div>
    <br/>
      <div className="footer-redes">
      <a href="https://github.com/JonathanIasenza"><AiFillGithub id="git-icon" size="25px"/></a>
      <a href="https://www.linkedin.com/in/jonathan-sebastian-iasenza-3711211a7/"><IoLogoLinkedin id="linked-icon"size="25px"/></a>
      <a href="http://jonaiasenza.000webhostapp.com"><MdFolderShared id="port-icon" size="25px" /></a>
      </div>
      <p id="parrafo">Si lo deseas podés contactarme a mi email o teléfono celular <br/> <AiOutlinePhone/> <text className="blue-font">+54 1167221543 / </text> <AiOutlineMail/> <text className="blue-font">jonaiasenza@gmail.com</text></p>
    </footer> 
    </React.Fragment>
  );
};  
  
  export default Footer;