import {MaskID, PanelID} from './config';

export default function () {
  GM_addStyle(`
    /** 公共部分 **/
    @font-face { 
      font-family: ifont;
      src: url("http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix") format("embedded-opentype"), url("http://at.alicdn.com/t/font_1442373896_4754455.woff") format("woff"), url("http://at.alicdn.com/t/font_1442373896_4754455.ttf") format("truetype"), url("http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont") format("svg");
    }
    ${'#' + MaskID}{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999999;
      width:100%;
      height:100%;
      background: rgba(45, 45, 45, 0.6);
      margin: 0;
      padding: 0;
      overflow: hidden;
      font-size:14px;
      line-height:1.42857143em;
    }
    
    ${'#' + MaskID} *{
      -webkit-box-sizing:border-box;
      box-sizing:border-box;
    }
    
    ${'#' + MaskID} label{
      display:inline-block;
      max-width:100%;
      margin-bottom:5px;
      font-weight:700;
    }
    
    ${'#' + MaskID} .btn{
      display:inline-block;
      padding:6px 12px;
      font-size:14px;
      line-height:1.42857143;
      text-align:center;
      white-space:nowrap;
      vertical-align:middle;
      -ms-touch-action:manipulation;
      touch-action:manipulation;
      cursor:pointer;
      -webkit-user-select:none;
      -moz-user-select:none;
      user-select:none;
      background-image:none;
      border:1px solid transparent;
      border-radius:4px;
      margin-top:5px;
      margin-bottom:5px;
      color:#333;
      background-color:#fff;
      border-color:#333;
    }
    
    ${'#' + MaskID} .form-group{
      margin-bottom:15px;
    }
    
    ${'#' + MaskID} .form-control{
      display:block;
      width:100%;
      height:34px;
      padding:6px 12px;
      font-size:14px;
      line-height:1.42857143;
      color:#555;
      background-color:#fff;
      background-image:none;
      border:1px solid #ccc;
      border-radius:4px;
      -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);
      box-shadow:inset 0 1px 1px rgba(0,0,0,.075);
      -webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    
    ${'#' + MaskID} .form-control:focus{
      border-color:#66afe9;
      outline:0;
      -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
      box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    }
    
    ${'#' + MaskID} p{
      color:#fff;
      line-height:3em;
    }
    
    ${'#' + MaskID} a{
      color:#555;
      text-decoration:none;
    }
    
    ${'#' + MaskID} .block-clear{
      visibility:hidden;
      font-size:0;
      width:0;
      height:0;
      clear:both;
    }
    ${'#' + MaskID} ul{
      list-style:none;
    }
    ${'#' + MaskID} ul li{
      color:#555;
    }
    
    
    /** 非公共部分 **/
    ${'#' + PanelID}{
      position: relative;
      top: 100px;
      width: 800px;
      height: auto;
      margin: 0 auto;
      background: #fff;
      z-index: inherit;
    }
    
    ${'#' + PanelID} .block-title{
      text-align:center;
      line-height:36px;
      font-size: 1.6em;
      border-bottom:1px solid #ccc;
    }
    
    ${'#' + PanelID} .block-container{
      margin-top:10px;
      padding-bottom:10px;
    }
    
    ${'#' + PanelID} .block-menu{
      width:10%;
      float:left;
    }
    
    ${'#' + PanelID} .block-menu ul{
      text-align:center;
    }
    
    ${'#' + PanelID} .block-menu ul li{
      line-height:4em;
      cursor:pointer;
    }
    
    
    ${'#' + PanelID} .block-menu ul li.active{
      background:#6B6B6B;
      color:#fff;
    }
    
    ${'#' + PanelID} .block-content{
      width:90%;
      padding-left:20px;
      float:left;
      max-height:400px;
      overflow-y:auto;
    }
    
    ${'#' + PanelID} .block-content .block-list table{
      width:100%;
    }
    
    ${'#' + PanelID} .block-content .block-list table tr{
      text-align:center;
      line-height:24px;
    }
    
  `);
}
